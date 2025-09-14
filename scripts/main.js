const socketName = 'module.solicitacao-secreta';

const addSecretRequestButton = (hud, html, tokenData) => {
    if (!game.user.isGM) return;
    const token = canvas.tokens.get(tokenData._id);
    if (!token.actor) return;

    // Usa a chave de tradução para o título do botão
    const buttonTitle = game.i18n.localize("SS.RequestButtonTitle");
    const button = `
        <div class="control-icon" title="${buttonTitle}">
            <i class="fas fa-user-secret"></i>
        </div>
    `;

    const buttonElement = $(button);
    html.find('col.right').append(buttonElement);

    buttonElement.on('click', () => {
        openSkillSelectionDialog(token.actor);
    });
};

const openSkillSelectionDialog = (actor) => {
    const skills = CONFIG.DND5E.skills;
    let content = '<div class="dialog-buttons">';

    for (const [key, skill] of Object.entries(skills)) {
        content += `<button class="skill-button" data-skill="${key}">${skill.label}</button>`;
    }
    content += '</div>';

    new Dialog({
        // Usa a chave de tradução para o titulo do dialogo, formatando com o nome do ator.
        title: game.i18n.format("SS.DialogTitle", {name: actor.name}),
        content: content,
        buttons: {
            close: {
                icon: '<i class="fas fa-time"></i>',
                // Usa a chave de tradução para o botão cancelar
                label: game.i18n.localize("SS.CancelButton")
            }
        },
        render: (html) => {
            html.on('click', '.skill-button', (event) => {
                const skillId = $(event.currentTarget).data('skill');

                const owners = Object.entries(actor.ownership)
                    .filter(([id, level]) => level === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER && game.users.get(id)?.active && !game.users.get(id)?.isGM)
                    .map(([id]) => id);

                const ownerId = owners[0];

                if (ownerId) {
                    game.socket.emit(socketName, {
                        type: 'REQUEST_SKILL_ROLL',
                        actorId: actor.id,
                        skillId: skillId,
                        targetUserId: ownerId
                    });
                } else {
                    // Usa a chave de tradução para a notificação
                    ui.notifications.warn(game.i18n.localize("SS.NoOwnerWarning"));
                }

                html.closest('.dialog').find('.close').click();
            });
        }
    }).render(true);
};

const onSocketMessage = (data) => {
    if (data.type === 'REQUEST_SKILL_ROLL' && data.targetUserId === game.user.id) {
        const actor = game.actors.get(data.actorId);
        if (actor) {
            // Passa a opção blind diretamente para o método rollSkill
            actor.rollSkill(data.skillId, { blind: true });
        }
    }
};

Hooks.once('ready', () => {
    game.socket.on(socketName, onSocketMessage);
});

Hooks.on('renderTokenHUD', addSecretRequestButton);
