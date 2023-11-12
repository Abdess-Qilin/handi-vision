{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import Header from "../../Partials/Header/Header";

const NotFound = () => {
    return (
        <>
        <Header />
            <div className="middle-box text-center animated fadeInDown">
                <h1>404</h1>
                <h3 className="font-bold">Page non trouvée</h3>

                <div className="error-desc">
                    Désolé, mais la page que vous recherchez n'a pas été trouvée. Essayez de vérifier l'URL pour des erreurs, puis appuyez sur le bouton de rafraîchissement de votre navigateur ou essayez de trouver quelque chose d'autre dans notre application.
                    <form className="form-inline m-t justify-content-center" role="form">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Rechercher une page"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Rechercher</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NotFound;
