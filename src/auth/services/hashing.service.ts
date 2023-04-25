export abstract class HashingService {
  public abstract hash(password: string): Promise<string>;

  public abstract compare(password: string, hash: string): Promise<boolean>;
}
