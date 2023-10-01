import React, { useState, useEffect, } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerF} from '@react-google-maps/api';
import { Helmet } from 'react-helmet-async';
import logo from "../assets/images/logo-pharmaGard1.webp"
import { quartiers } from '../helpers/quartier';
import { config } from '../config';
import { useSelector } from 'react-redux';
import { selectPharmacies } from '../slices/pharmacieSlice';

const API_KEY = config.API_KEY
const containerStyle = { 
    height: '60vh', 
    width: '100%', 
    borderRadius: "20px 20px 0 0"
}

const Home = () => {
    
    const pharmacies = useSelector(selectPharmacies)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: API_KEY
    })

    const defaultProps = {
        center: {
            lat: 48.8383426,
            lng: 2.2908211
        },
        zoom: 16    
    };
      
    
    const [position, setPosition] = useState(defaultProps.center);
    const [results, setResults] = useState([])
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [search, setSearch] = useState("")

    const createMarkers = () =>{
        return results.map((pharma, index) =>{
            let coords = {
                lat: pharma.latitude,
                lng: pharma.longitude
            }

            return (
            <Marker
                key={index}
                position={coords}
                onClick={() => setInfoWindowOpen(true)}
            >
                    {infoWindowOpen && <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
			             <div
				          	className="pharmaMarker"
				         >	
				        	<p><strong>{pharma.pharmaName}</strong></p>
                            <p>{pharma.quartier}</p>
                            <p>{pharma.address}</p>
					     </div>
			        </InfoWindow>}
            </Marker>)
        })     
    }

    const onSubmitForm = () => {
        let pharmas = pharmacies.pharmacies.filter(pharma => pharma.quartier === search)
        setResults(pharmas)
    }

    useEffect(()=>{
        if (window.navigator.geolocation) {            
            window.navigator.geolocation.getCurrentPosition((position) => {
			 	let coords = {lat: position.coords.latitude, lng: position.coords.longitude};
			 	setPosition(coords)
			 	
            }, (error)=>{
            	console.log(error)
            })
            
        }else{
            alert("Vous n'êtes pas géolocalisé")
        }
    }, [])

    return (
        <main className="main-home">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Pharmacie de garde à Tamba</title>
                <meta name="description" content="Pharma'Gard-Site officiel: Trouver les pharmacies ouvertes en journée et les pharmacies de garde la nuit, les dimanches et jours fériés à Tamba"/>
                <link rel="canonical" href="" />
            </Helmet>
            <article className="about-pharmaGard">
                <div className="logo-container">
                    <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
                </div> 
                <div className="text-container">
                    <h1>Toutes les pharmacies ouvertes en journée et les pharmacies de garde à Tamba. </h1>
                </div>
            </article>
            <section className="google-map-container">
                <article className="search-container">
                    <form 
                        onSubmit={(e) =>{
                            e.preventDefault()
                            onSubmitForm()  
                        }}
                    >
                        <div className="items">
                            <label htmlFor="quartier">
                                <select
                                    id='quartier'
                                    className="item"
                                        onChange={(e) => {
                                            setSearch(e.currentTarget.value)
                                        }}
                                >
                                    <option value=""> Votre quartier </option>
                                    {
                                        quartiers.map((quartier, index) =>{
                                            return (
                                                <option key={index} value={quartier}>
                                                    {quartier}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="search-submit">
                            <input type="submit" value="Rechercher une pharmacie" />
                        </div>
                    </form>
                </article>
                <article className="google-map">
                    <div >
                        { !isLoaded ? <div> Loading...</div> :
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={position}
                                zoom={defaultProps.zoom}
                                onClick={() => setInfoWindowOpen(false)}
                            >
                                { /* Child components, such as markers, info windows, etc. */ }
                                <MarkerF
                                    position={position}
                                    icon={"http://www.robotwoods.com/dev/misc/bluecircle.png"}
                                />
                                {createMarkers()}
                            </GoogleMap>
                        }
                    </div>
                </article>
            </section>
            <section className="about-pharma-gard">
                <div>
                    <h2>À propos</h2>
                    <p>
                        Pharma'Gard est un site web (pharmagard-tamba.com) qui fournit des informations sur les <strong>pharmacies ouvertes</strong> à Tamba, notamment <strong>les pharmacies de garde </strong> les samedis après-midis, les dimanches et les jours fériés et la nuit.
                    </p>

                    <p>
                        Avec le site internet Pharma'Gard, vous pouvez rechercher une pharmacie ouverte en semaine et une pharmacie de garde le samedi après-midi, le dimanche et les jours fériés autour de la localisation souhaitée. Vous identifiez ainsi la pharmacie ouverte en journée ou de garde la plus proche de vous et trouvez facilement le meilleur itinéraire pour vous y rendre.
                    </p>

                    <p>
                        Pharma'Gard (pharmagard-tamba.com) est le fruit d'un jeune Tambacoundois. Soucieux des difficultés que rencontre les Tambakoundois à trouver <strong>les pharmacies de garde</strong> les samedis après-midis, les dimanches et les jours fériés et la nuit, le site internet pharmagard-tamba.fr fournit une information fiable et accessible à tous les Tambacoundois sur la permanence des pharmacies ouvertes et en particulier les pharmacies de garde.
                    </p>
                </div>
                
            </section>
        </main>
    )
}

export default Home