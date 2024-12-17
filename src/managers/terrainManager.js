import AbstractManager from "./abstractManager.js";
import Terrain from "../components/terrain.js";

export default class TerrainManager extends AbstractManager {
  constructor(terrainsData) {
    const terrains = terrainsData.map(data =>
      new Terrain(data.type, data.x, data.y, data.width, data.height, data.properties)
    );
    super(terrains);
  }

  applyTerrains(players) {
    this.update(terrain => {
      players.forEach(player => terrain.applyEffect(player));
    });
  }

  render(ctx) {
    super.render(ctx, (ctx, terrain) => terrain.render(ctx));
  }
}
