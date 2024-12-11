import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function SectionAll() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true); // Pour indiquer si les images sont en train de se charger
  const [error, setError] = useState(null); // Pour gérer les erreurs éventuelles

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const bucketName = "artworks"; // Nom du bucket contenant les images
        const folderName = "img"; // Nom du dossier contenant les images

        // Lister tous les fichiers dans le dossier 'img' du bucket 'artworks'
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list(folderName, { limit: 20 }); // Liste les fichiers dans le dossier 'img', avec une limite de 20 fichiers

        if (error) {
          setError("Erreur lors de la récupération des fichiers.");
          console.error(error);
          return;
        }

        // Si aucune image n'est présente dans le dossier
        if (data.length === 0) {
          setImageUrls([]); // Pas d'images à afficher
        } else {
          // Récupérer l'URL publique pour chaque image
          const imageUrls = data
            .map((file) => {
              const urls = supabase.storage
                .from(bucketName)
                .getPublicUrl(`${folderName}/${file.name}`);

              if (error) {
                console.error(
                  "Erreur lors de la récupération de l'URL publique :",
                  error
                );
                return null;
              }
              return urls.data.publicUrl;
            })
            .filter((url) => url !== null); // Filtrer les valeurs nulles si une erreur est survenue

          setImageUrls(imageUrls); // Mettre à jour l'état avec les URLs des images
        }
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de la récupération des images."
        );
        console.error(error);
      } finally {
        setLoading(false); // Fin du chargement des images
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="sectionAll">
      <ul className="listItem">
        {loading && <p>Chargement des images...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {imageUrls.length === 0 && !loading && !error && (
          <p>Aucune image disponible</p>
        )}

        {imageUrls.length > 0 &&
          imageUrls.map((url, index) => (
            <li key={index} className="imgItem">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default SectionAll;
