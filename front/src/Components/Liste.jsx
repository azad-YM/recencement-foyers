import { useState } from "react";
import { Button } from "../Components/Forms/Button";


export function Liste({foyers, onClickEdit, onClickDelete}){
  const [open, setOpen] = useState(null);
  //Etat du fitre
  const [selectedCommune, setSelectedCommune] = useState("")
  //Etat du tri
  const [tri, setTri] = useState("");
  //Etat de consultation d'un foyer
  const [selectedFoyer, setSelectedFoyer] = useState(null);
  //Récupérer les communes automatiquement   
  const communes = [...new Set(
    foyers.map((foyer) => foyer.commune)
  )];
         
  //Consulter un foyer
  const handleView = (foyer) => {
    setSelectedFoyer(foyer);
  }
  // Nombre total des personnes recensées
  const totalPersonnes = foyers.reduce((total, foyer) =>
    total + foyer.nombrePersonnes, 0);
   // Filtrer et trier 
   const foyersFiltresEtTries = [...foyers]
  //Filtrer par commune
  .filter((foyer) => {
      if (selectedCommune=== "") {
      return true;
    }
   return foyer.commune === selectedCommune;
  })
  // Trier par nom
    .sort((a, b) => {
  // trier par nom
    if (tri === "nomResponsable") {
      return  a.nomResponsable.localeCompare(b.nomResponsable, "fr", {
        sensitivity: "base",});
    }
  // Trier par nombre de personnes
    if (tri === "nombrePersonnes") {
       return  Number(b.nombrePersonnes) - Number(a.nombrePersonnes); 
    }
    return 0;
  });

  return(
    <div className="mt-5">
     <div className="d-flex align-items-center my-4">
        <hr className="flex-grow-1" />
        <span className="mx-3 fw-bold">
          Liste des foyers
        </span>
        <hr className="flex-grow-1" />
     </div>
     <div className='row '>
       <div className=' col-md-6 mt-3 mb-4'>
          <span className='fw-bold p-3 border border-1 rounded shadow-sm'>
            Nombre de foyer(s): {foyers.length}
          </span>
       </div>
       <div className='col-md-6 mt-3 mb-4'>
          <span className='fw-bold p-3 border border-1 rounded shadow-sm'>
            Nombre de personne(s): {totalPersonnes }
          </span>
       </div>
      </div>
      <div className="row g-3 m-4">
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">
            Filtrer par commune
          </label>
          <select
            className="form-select"
            value={selectedCommune}
            onChange={(e) => setSelectedCommune(e.target.value)}>
            <option value="">Toutes les communes</option>
                {communes.map((commune) => (
                  <option key={commune} value={commune}>
                    {commune}
                  </option>
                ))}
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">
           Trier par
          </label>
              <select
                className="form-select"
                value={tri}
                onChange={(e) => setTri(e.target.value)}
                    >
                <option value="">Aucun tri</option>
                <option value="nomResponsable">Nom</option>
                <option value="nombrePersonnes">
                  Nombre de personnes
                </option>
              </select>
        </div>
      </div>
      <div className='table-responsive'>
         <table className="table table-hover align-middle text-center table-striped table-bordered border-1 shadow-sm table-info mt-3">
           <thead>
             <tr>
               <th>N°</th>
               <th>Nom du responsable</th>
               <th>Commune</th>
               <th>Nombre de personnes</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {foyersFiltresEtTries.length === 0 ? (
           <tr>
              <td colSpan="5" className="text-center py-4">
                Aucun foyer trouvé.
              </td>
            </tr>):(
            foyersFiltresEtTries.map((foyer, index) => (
              <tr key={foyer.id}>
                <td>{index + 1}</td>
                <td className='align-item-center'>{foyer.nomResponsable}</td>
                <td>{foyer.commune}</td>
                <td>{foyer.nombrePersonnes}</td>
                <td className="text-end">
                  <div className="position-relative d-inline-block">
                     <Button
                         className={`btn-menu ${open=== foyer.id ? "active" : ""}`}
                        type="button"
                        aria-expanded={open === foyer.id}
                        onClick={() =>
                        setOpen(
                            open === foyer.id ? null : foyer.id
                        )
                        }
                        aria-label="Ouvrir le menu des actions">
                         ⋮
                      </Button>
                      {open === foyer.id && 
                        (<div className="dropdown-menu show dropdown-menu-end menu-actions">
                            <Button
                                className="dropdown-item"
                                onClick={() =>{ handleView(foyer);  setOpen(null);}}>
                              <svg xmlns="http://www.w3.org/2000/svg"
                                 
                                  width="20" height="20" viewBox="0 0 24 24"
                                  fill="none" stroke="currentColor" strokeWidth="1.8"
                                  strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                                Consulter
                              </Button>
                              <Button
                                  className="dropdown-item"
                                  onClick={() => {onClickEdit(foyer);  setOpen(null);}}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 20h9"/>
                                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>
                                </svg>
                                  Modifier
                              </Button>
                              <Button
                                className="dropdown-item text-danger action-danger"
                                onClick={()=> {onClickDelete(foyer.id);  setOpen(null);}} >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    
                                    width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"/>
                                  <path d="M8 6V4h8v2"/>
                                  <path d="m19 6-1 14H6L5 6"/>
                                  <path d="M10 11v5M14 11v5"/>
                                </svg>
                                Supprimer
                              </Button>
                           </div>
                          ) 
                       }
                     </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    {selectedFoyer && (
      <div
        className="modal fade show d-block"  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title">
                Informations du foyer
              </h5>
              <Button
                className="btn-close"
                onClick={() => setSelectedFoyer(null)}>
              </Button>
            </div>
            <div className="modal-body bg-light">
              <p>
                <strong>Responsable :</strong>{" "}
                {selectedFoyer.nomResponsable}
              </p>
              <p>
                <strong>Adresse :</strong>{" "}
                {selectedFoyer.adresse}
              </p>
              <p>
                <strong>Commune :</strong>{" "}
                {selectedFoyer.commune}
              </p>
              <p>
                <strong>Nombre de personnes :</strong>{" "}
                {selectedFoyer.nombrePersonnes}
              </p>
              <p>
                <strong>Téléphone :</strong>{" "}
                {selectedFoyer.telephone}
              </p>
            </div>
            <div className="modal-footer">
              <Button
                type='button'
                className="btn btn-danger "
                onClick={() => setSelectedFoyer(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </div> 
      </div>
    )}
   </div>    
  )

}