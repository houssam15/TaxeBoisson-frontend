import {CategotieDeLocal} from "./categotie-de-local";

export class TauxTaxeTrimestrielle {
  public  id!: number;
  public  ref!: string;
  public  dateAppMin!: Date;
  public  dateAppMax!: Date;
  public  categorieDeLocal!: CategotieDeLocal;
  public  pourcentage!: string;
  public  pourcentageRetardPremierMois!: string;
  public  pourcentageRetardAutreMois !: string;

}
