import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import '../css/StatsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsPage = () => {
  const [mediaScores, setMediaScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScores();
  }, []);

  const infos = [process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_TOKEN]; // Infos pour l'authentification

  const fetchScores = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/medias?infos=${infos}`, {
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
      });
    
      if (!response.ok) throw new Error("Erreur lors de la récupération des scores des médias");
    
      const data = await response.json();
    
      // Trier les médias par score décroissant
      const scores = data
        .map((media) => ({
          title: media.title,
          score: media.score,
        }))
        .sort((a, b) => b.score - a.score); // Tri des scores en ordre décroissant
    
      setMediaScores(scores);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement des statistiques...</p>;
  }

  // Préparation des données pour Chart.js
  const chartData = {
    labels: mediaScores.map((media) => media.title),
    datasets: [
      {
        label: "Score des Médias",
        data: mediaScores.map((media) => media.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="stats-page">
      <h1>Statistiques des Scores des Médias</h1>
      <div className="chart-container">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>
      <button className="back-button" onClick={() => navigate('/admin')}>Retour</button>
    </div>
  );
};

export default StatsPage;
