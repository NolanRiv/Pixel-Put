import AbstractManager from "./abstractManager.js";

export default class TeleporterManager extends AbstractManager {
  constructor(teleportersData) {
    const teleporters = teleportersData.map(data =>
      new teleporter(data.x, data.y, data.radius, data.bouncy || false)
    );
    super(teleporters); // Initialisation via AbstractManager
  }

  applyTeleporters(players) {
    this.update(teleporter => {
      players.forEach(player => {
        const dx = player.x - teleporter.entry.x;
        const dy = player.y - teleporter.entry.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        if (distance <= player.radius + teleporter.entry.radius) {
          teleporter.applyEffect(player);
        }
      });
    });
  }

  render(ctx) {
    super.render(ctx, (ctx, teleporter) => teleporter.render(ctx));
  }
}