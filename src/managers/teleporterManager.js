import Teleporter from "../components/teleporter.js";
import AbstractManager from "./abstractManager.js"

export default class TeleporterManager extends AbstractManager {
  constructor(teleportersData, assetsManager) {
    const teleporters = teleportersData.map(data =>
      new Teleporter(
        data.entry.x, data.entry.y, // entryX et entryY
        data.exit.x, data.exit.y,   // exitX et exitY
        data.entry.radius,          // radius
        assetsManager
      )
    );
    super(teleporters);
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