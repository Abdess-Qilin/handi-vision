import Header from "../../Partials/Header/Header";

const Forbidden = () => {
    return (
        <>
            <Header />
            <div className="middle-box text-center animated fadeInDown">
                <h1>403</h1>
                <h3 className="font-bold">Accès interdit</h3>

                <div className="error-desc">
                    Désolé, vous n'avez pas les droits nécessaires pour accéder à cette page. Veuillez contacter l'administrateur du site si vous pensez que c'est une erreur.
                </div>
            </div>
        </>
    )
}

export default Forbidden;
