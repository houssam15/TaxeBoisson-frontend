import {Redevable} from "./redevable";
import {CategotieDeLocal} from "./categotie-de-local";
import {Rue} from "./rue";

export class Local {
  public  id!: number;
  public  reference!: string;
  public  redevable !: Redevable;
  public  categorieDeLocal!: CategotieDeLocal;
  public  dateAjoutDeLocal!: Date;
  public  dernierDatePayTrimestriel!: Date;
  public  dernierDatePayAnnuel!: Date;
  public  rue!: Rue;
}
