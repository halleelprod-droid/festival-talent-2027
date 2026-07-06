import { permanentRedirect } from "next/navigation";

// /tickets est l'URL canonique de la billetterie. Cette route est conservée
// uniquement pour ne pas casser les liens existants vers /billetterie.
export default function BilletteriePage() {
  permanentRedirect("/tickets");
}
