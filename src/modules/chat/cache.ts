import { Injectable } from "@nestjs/common";

@Injectable()
class Cache {
  private _idCache: Record<number, string> = {};

  public get idCache(): Record<number, string> {
    return this._idCache;
  }

  public save(id: number, value: string) {
    this.idCache[id] = value;
    return this._idCache;
  }

  public isExist(id: number) {
    return this._idCache[id];
  }

  public delete(id: number) {
    delete this._idCache[id];
    return this._idCache[id];
  }

  public getValue(ids: number | number[]): string[] {
    if (Array.isArray(ids)) {
      return ids.map((id) => this._idCache[id]);
    } else return [this._idCache[ids]];
  }
}
export default Cache;
