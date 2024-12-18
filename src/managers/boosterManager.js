import AbstractManager from "./abstractManager.js";
import Booster from "../components/booster.js";

export default class BoosterManager extends AbstractManager {
  constructor(boostersData, assetsManager) {
    const boosters = boostersData.map(data =>
      new Booster(data.x, data.y, data.radius, data.boostFactor, assetsManager)
    );
    super(boosters); 
    this.assetsManager = assetsManager;
  }

  applyBoosters(players) {
    this.update(booster => {
      players.forEach(player => {
        const dx = player.x - booster.x;
        const dy = player.y - booster.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        if (distance <= player.radius + booster.radius) {
          booster.applyEffect(player);
        }
      });
    });
  }

  render(ctx) {
    super.render(ctx, (ctx, booster) => booster.render(ctx));
  }
}