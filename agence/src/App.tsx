import './App.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [dispoInput, setDispoInput] = useState('');
    const [dispos, setDispos] = useState([]);
    const [dispoError, setDispoError] = useState('');


    const handleAddDispo = () => {
        if (dispoInput && dispos.length < 3) {
            setDispos([...dispos, dispoInput]);
            setDispoInput('');
        }
    };

    const handleDeleteDispo = (index) => {
        const newDispos = [...dispos];
        newDispos.splice(index, 1);
        setDispos(newDispos);
    };

    const onSubmit = async (data) => {
        if (dispos.length === 0) {
            setDispoError("Veuillez ajouter au moins une disponibilité.");
            return;
        }

        setDispoError("");

        const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                civilite: data.Civilité,
                nom: data.Nom,
                prenom: data.Prénom,
                email: data["Adresse mail"],
                telephone: data["Téléphone"],
                motif: data.Motif,
                message: data["Votre message"],
                disponibilites: dispos
            })
        });

        const result = await response.text();
        alert(result);
    };

    return (
        <>
            <h1>CONTACTEZ L'AGENCE</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="left-column">
                    <h2>VOS COORDONNÉES</h2>
                    <div>
                        <label>
                            <input {...register("Civilité", { required: "Champ requis" })} type="radio" value="M" /> M
                        </label>
                        <label>
                            <input {...register("Civilité", { required: "Champ requis" })} type="radio" value="Mme" /> Mme
                        </label>
                        <label>
                            <input {...register("Civilité", { required: "Champ requis" })} type="radio" value="Autre" /> Autre
                        </label>
                        {errors.Civilité && <p className="error">{errors.Civilité.message}</p>}
                    </div>

                    <input type="text" placeholder="Nom" {...register("Nom", {
                        required: "Le nom est requis",
                        maxLength: { value: 60, message: "60 caractères max" }
                    })} />
                    {errors.Nom && <p className="error">{errors.Nom.message}</p>}

                    <input type="text" placeholder="Prénom" {...register("Prénom", {
                        required: "Le prénom est requis",
                        maxLength: { value: 60, message: "60 caractères max" }
                    })} />
                    {errors.Prénom && <p className="error">{errors.Prénom.message}</p>}

                    <input type="email" placeholder="Adresse mail" {...register("Adresse mail", {
                        required: "L’adresse email est requise",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                            message: "Format d'email invalide"
                        }
                    })} />
                    {errors["Adresse mail"] && <p className="error">{errors["Adresse mail"].message}</p>}

                    <input type="tel" placeholder="Téléphone" {...register("Téléphone", {
                        required: "Le numéro est requis",
                        maxLength: { value: 10, message: "Numéro invalide" },
                        minLength: { value: 10, message: "Numéro invalide" }
                    })} />
                    {errors["Téléphone"] && <p className="error">{errors["Téléphone"].message}</p>}

                    <h2>VOS DISPONIBILITÉS</h2>
                    <input
                        type="datetime-local"
                        value={dispoInput}
                        onChange={e => setDispoInput(e.target.value)}
                    />
                    {dispoError && <p className="error">{dispoError}</p>}
                    <button type="button" onClick={handleAddDispo} disabled={dispos.length >= 3}>

                        Ajouter cette disponibilité
                    </button>



                    <ul>
                        {dispos.map((d, index) => (
                            <li key={index}>
                                {new Date(d).toLocaleString()}
                                <button type="button" onClick={() => handleDeleteDispo(index)}>❌</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="right-column">
                    <h2>VOTRE MESSAGE</h2>
                    <div>
                        <div className="radio-group">
                            <label>
                                <input {...register("Motif", {required: "Champ requis"})} type="radio" value="Visite"/>
                                Demande de visite
                            </label>
                            <label>
                                <input {...register("Motif", {required: "Champ requis"})} type="radio" value="Rappel"/>
                                Être rappelé.e
                            </label>
                            <label>
                                <input {...register("Motif", {required: "Champ requis"})} type="radio" value="Photos"/>
                                Plus de photos
                            </label>
                        </div>
                        {errors.Motif && <p className="error">{errors.Motif.message}</p>}

                        <textarea placeholder="Écrivez votre message ici..." {...register("Votre message", {
                            required: "Le message est requis",
                            maxLength: {value: 400, message: "400 caractères max"}
                        })} />
                        {errors["Votre message"] && <p className="error">{errors["Votre message"].message}</p>}
                    </div>

                    <div className="submit-container">
                        <input type="submit" value="Envoyer"/>
                    </div>

                </div>
            </form>
        </>
    )
}

export default App
