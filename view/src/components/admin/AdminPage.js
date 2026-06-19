import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showWarning } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/Admin.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [medias, setMedias] = useState([]);
  const [profils, setProfils] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // Sections dépliables — "medias" ouverte par défaut pour un dashboard plus vivant
  const [expandedSections, setExpandedSections] = useState({
    users: false,
    medias: true,
    contacts: false
  });

  const [userSearch, setUserSearch] = useState("");
  const [mediaSearch, setMediaSearch] = useState("");
  const [contactFilter, setContactFilter] = useState("all");

  useEffect(() => { fetchData(); }, []);

  const infos = [process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_TOKEN];

  const fetchData = async () => {
    const Response = await fetch(`${process.env.REACT_APP_API_URL}/admin/board?infos=${infos}`, {
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!Response.ok) { showError("Erreur lors de la récupération des données"); return; }
    const datas = await Response.json();
    setUsers(datas.data.users);
    setMedias(datas.data.medias);
    setProfils(datas.data.profils);
    setContacts(datas.data.contacts);
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/delete/${id}?infos=${infos}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la désactivation de l'utilisateur"); }
    else { showSuccess("Utilisateur désactivé avec succès"); fetchData(); }
  };

  const handleDeleteverUser = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/deletever/${id}?infos=${infos}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la suppression de l'utilisateur"); }
    else { showSuccess("Utilisateur supprimé avec succès"); fetchData(); }
  };

  const handleReactiveUser = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/reactivate/${id}?infos=${infos}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la réactivation de l'utilisateur"); }
    else { showSuccess("Utilisateur réactivé avec succès"); fetchData(); }
  };

  const handleUpdateUser = async (id) => { navigate("/admin/edit/user/" + id); };

  const handleDeleteMedia = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/delete/${id}?infos=${infos}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la désactivation du media"); }
    else { showSuccess("Media désactivé avec succès"); fetchData(); }
  };

  const handleReactiveMedia = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/reactivate/${id}?infos=${infos}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la réactivation du media"); }
    else { showSuccess("Media réactivé avec succès"); fetchData(); }
  };

  const handleLuContact = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact/lu/${id}?infos=${infos}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la mise à jour du contact"); }
    else { showSuccess("Contact mis à jour avec succès"); fetchData(); }
  };

  const handleDeleteContact = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact/delete/${id}?infos=${infos}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
    });
    if (!response.ok) { showError("Erreur lors de la suppression du contact"); }
    else { showSuccess("Contact supprimé avec succès"); fetchData(); }
  };

  const handleUpdateMedia = async (id) => { navigate("/admin/edit/media/" + id); };

  const toggleSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };
  const openSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: true });
  };

  const filteredUsers = users.filter(user =>
    user.firstname.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.lastname.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredMedias = medias.filter(media =>
    media.title.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    (media.status ? 'actif' : 'inactif').includes(mediaSearch.toLowerCase()) ||
    media.type.toLowerCase().includes(mediaSearch.toLowerCase())
  );
  const filteredContacts = contacts.filter(contact => {
    if (contactFilter === "all") return contact.status === false || contact.status === true;
    if (contactFilter === "read") return contact.status === false;
    if (contactFilter === "unread") return contact.status === true;
    return true;
  });
  // Statistiques pour les cartes
  const unreadContacts = contacts.filter(c => c.status === true).length;

  // Données du graphique : répartition des médias par type
  const TYPE_LABELS = { film: 'Films', serie: 'Séries', manga: 'Mangas' };
  const typeCounts = medias.reduce((acc, m) => { acc[m.type] = (acc[m.type] || 0) + 1; return acc; }, {});
  const orderedTypes = ['film', 'serie', 'manga', ...Object.keys(typeCounts).filter(t => !['film', 'serie', 'manga'].includes(t))];
  const mediaStats = orderedTypes
    .filter(t => typeCounts[t])
    .map(t => ({ type: t, label: TYPE_LABELS[t] || (t.charAt(0).toUpperCase() + t.slice(1)), count: typeCounts[t] }));
  const maxCount = Math.max(1, ...mediaStats.map(s => s.count));
  const activeMedias = medias.filter(m => m.status === true).length;
  const inactiveMedias = medias.length - activeMedias;

  return (
    <div className="admin-layout">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">C</span>
          <span>CinéManga</span>
        </div>
        <div className="admin-nav-label">Gestion</div>
        <nav className="admin-nav">
          <button className="admin-nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>▦ Tableau de bord</button>
          <button className="admin-nav-item" onClick={() => openSection('medias')}>🎬 Médias</button>
          <button className="admin-nav-item" onClick={() => openSection('users')}>👥 Utilisateurs</button>
          <button className="admin-nav-item" onClick={() => openSection('contacts')}>
            ✉ Messages {unreadContacts > 0 && <span className="admin-nav-badge">{unreadContacts}</span>}
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/stats")}>📊 Statistiques</button>
        </nav>
        <div className="admin-user">
          <span className="admin-user-avatar">A</span>
          <div>
            <div className="admin-user-name">Admin</div>
            <div className="admin-user-role">Administrateur</div>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN ===================== */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-topbar-title">Tableau de bord</h1>
            <p className="admin-topbar-sub">Vue d'ensemble de la plateforme</p>
          </div>
          <div className="admin-actions">
            <button className="admin-btn-ghost" onClick={() => navigate("/admin/create/user")}>+ Utilisateur</button>
            <button className="admin-btn-primary" onClick={() => navigate("/admin/create/media")}>+ Nouveau média</button>
          </div>
        </header>

        <div className="admin-content">
          {/* ----- Cartes de stats ----- */}
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-head"><span className="stat-icon stat-icon-1">🎬</span></div>
              <div className="stat-value">{medias.length}</div>
              <div className="stat-label">Médias</div>
            </div>
            <div className="stat-card">
              <div className="stat-head"><span className="stat-icon stat-icon-2">👥</span></div>
              <div className="stat-value">{users.length}</div>
              <div className="stat-label">Utilisateurs</div>
            </div>
            <div className="stat-card">
              <div className="stat-head"><span className="stat-icon stat-icon-3">❤</span></div>
              <div className="stat-value">{profils.length}</div>
              <div className="stat-label">Favoris</div>
            </div>
            <div className="stat-card">
              <div className="stat-head">
                <span className="stat-icon stat-icon-4">✉</span>
                {unreadContacts > 0 && <span className="stat-pill">{unreadContacts} nouv.</span>}
              </div>
              <div className="stat-value">{contacts.length}</div>
              <div className="stat-label">Messages</div>
            </div>
          </div>

          {/* ===================== SECTION MÉDIAS ===================== */}
          <section className="admin-section">
            <div className="section-header" onClick={() => toggleSection("medias")}>
              <h2>Médias</h2>
              <span className="section-chevron">{expandedSections.medias ? "▲" : "▼"}</span>
            </div>
            {expandedSections.medias && (
              <div className="section-content">
                <div className="search-bar">
                  <input type="text" placeholder="Rechercher un média..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} />
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>ID</th><th>Titre</th><th>Description</th><th>Type</th><th>Image</th><th>Score</th><th>Statut</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filteredMedias.map((media) => (
                        <tr key={media.id}>
                          <td>{media.id}</td>
                          <td className="cell-strong">{media.title}</td>
                          <td className="cell-muted">{media.description.substring(0, 75) + " ..."}</td>
                          <td><span className="type-tag">{media.type}</span></td>
                          <td className="cell-muted">{media.imageUrl}</td>
                          <td className="cell-score">{media.score}</td>
                          <td><span className={media.status ? "pill pill-on" : "pill pill-off"}>{media.status ? "Actif" : "Inactif"}</span></td>
                          <td className="cell-actions">
                            <button className="btn-edit" onClick={() => handleUpdateMedia(media.id)}>Éditer</button>
                            {media.status === true && <button className="btn-warn" onClick={() => handleDeleteMedia(media.id)}>Désactiver</button>}
                            {media.status === false && <button className="btn-ok" onClick={() => handleReactiveMedia(media.id)}>Activer</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* ===================== SECTION UTILISATEURS ===================== */}
          <section className="admin-section">
            <div className="section-header" onClick={() => toggleSection("users")}>
              <h2>Utilisateurs</h2>
              <span className="section-chevron">{expandedSections.users ? "▲" : "▼"}</span>
            </div>
            {expandedSections.users && (
              <div className="section-content">
                <div className="search-bar">
                  <input type="text" placeholder="Rechercher un utilisateur..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Rôle</th><th>Statut</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td className="cell-strong">{user.lastname}</td>
                          <td>{user.firstname}</td>
                          <td className="cell-muted">{user.email}</td>
                          <td><span className="type-tag">{user.role}</span></td>
                          <td><span className={user.status ? "pill pill-on" : "pill pill-off"}>{user.status ? "Actif" : "Inactif"}</span></td>
                          <td className="cell-actions">
                            <button className="btn-edit" onClick={() => handleUpdateUser(user.id)}>Éditer</button>
                            {user.status === true && user.id != 1 && <button className="btn-warn" onClick={() => handleDeleteUser(user.id)}>Désactiver</button>}
                            {user.status === false && user.id != 1 && <button className="btn-ok" onClick={() => handleReactiveUser(user.id)}>Activer</button>}
                            {user.id != 1 && <button className="btn-danger" onClick={() => handleDeleteverUser(user.id)}>Supprimer</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* ===================== GRAPHIQUE — RÉPARTITION DES MÉDIAS ===================== */}
          <section className="admin-section">
            <div className="section-header section-header-static">
              <h2>Répartition des médias par type</h2>
              <span className="chart-total">{medias.length} médias au total</span>
            </div>
            <div className="section-content">
              {mediaStats.length === 0 ? (
                <p className="chart-empty">Aucune donnée à afficher.</p>
              ) : (
                <>
                  <div className="chart">
                    {mediaStats.map((s) => (
                      <div key={s.type} className="chart-col">
                        <span className="chart-val">{s.count}</span>
                        <div
                          className={`chart-bar chart-bar-${s.type}`}
                          style={{ height: `${Math.round((s.count / maxCount) * 180) + 8}px` }}
                        ></div>
                        <span className="chart-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <span><i className="chart-dot chart-dot-on"></i> {activeMedias} actifs</span>
                    <span><i className="chart-dot chart-dot-off"></i> {inactiveMedias} inactifs</span>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ===================== SECTION CONTACTS ===================== */}
          <section className="admin-section">
            <div className="section-header" onClick={() => toggleSection("contacts")}>
              <h2>Messages</h2>
              <span className="section-chevron">{expandedSections.contacts ? "▲" : "▼"}</span>
            </div>
            {expandedSections.contacts && (
              <div className="section-content">
                <div className="filter-dropdown">
                  <select value={contactFilter} onChange={(e) => setContactFilter(e.target.value)}>
                    <option value="all">Tous les messages</option>
                    <option value="read">Messages lus</option>
                    <option value="unread">Messages non lus</option>
                  </select>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>ID</th><th>Nom</th><th>Email</th><th>Message</th><th>Date</th><th>Statut</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.id}</td>
                          <td className="cell-strong">{contact.name}</td>
                          <td className="cell-muted">{contact.email}</td>
                          <td className="cell-muted">{contact.message}</td>
                          <td className="cell-muted">{contact.createdAt}</td>
                          <td><span className={contact.status ? "pill pill-warn" : "pill pill-on"}>{contact.status ? "Non lu" : "Lu"}</span></td>
                          <td className="cell-actions">
                            <button className="btn-edit" onClick={() => navigate("/admin/contact/" + contact.id)}>Voir</button>
                            {contact.status === true && <button className="btn-ok" onClick={() => handleLuContact(contact.id)}>Marquer lu</button>}
                            <button className="btn-danger" onClick={() => handleDeleteContact(contact.id)}>Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
