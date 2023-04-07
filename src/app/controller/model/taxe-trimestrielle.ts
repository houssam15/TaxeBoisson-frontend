import {Redevable} from "./redevable";
import {CategotieDeLocal} from "./categotie-de-local";
import {TauxTaxeTrimestrielle} from "./taux-taxe-trimestrielle";
import {Local} from "./local";

export class TaxeTrimestrielle {
  public  id!: number;
  public  reference!: string;
  public  redevable!: Redevable;
  public  categorieDeLocal!: CategotieDeLocal;
  public  tauxTaxeTrimestrielle!: TauxTaxeTrimestrielle;
  public  local!: Local;
  public  retardMonths!: number;
  public  montantBase!: number;
  public  montantTotal!: number;
  public  montantRetardPremierMois!: number;
  public  montantRetardAutreMois!: number;
  public  chifrreAffaire!: number;
  public  dateActuel!: Date;
}
