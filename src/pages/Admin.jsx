import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Upload,
  Image as ImageIcon,
  Video,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { achievementsAPI, projectsAPI } from "../services/api"; 

const ACHIEVEMENT_CATEGORIES = [
  "Hackathons",
  "Extracurricular Activities",
  "Courses & Certifications",
  "Academic Achievements"
];

const PROJECT_CATEGORIES = [
  "AI/ML",
  "Full Stack",
  "Backend",
  "Frontend",
  "IOT",
  "Other"
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("achievements");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [editingItem, setEditingItem] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAchievements();
    loadProjects();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const res = await achievementsAPI.getAll();
      setAchievements(res.data || res || []);
    } catch (err) {
      console.error("Failed to load achievements", err);
      alert(err?.error || "Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getAll();
      setProjects(res.data || res || []);
    } catch (err) {
      console.error("Failed to load projects", err);
      alert(err?.error || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const createAchievement = async (formData) => {
    try {
      setLoading(true);
      const res = await achievementsAPI.create(formData);
      const created = res.data || res;
      setAchievements((prev) => [...prev, created]);
      alert("Achievement created");
    } catch (err) {
      console.error(err);
      alert(err?.error || (err?.message ? err.message : "Failed to create achievement"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAchievement = async (id, formData) => {
    try {
      setLoading(true);
      const res = await achievementsAPI.update(id, formData);
      const updated = res.data || res;
      setAchievements((prev) => prev.map((it) => (it._id === id ? updated : it)));
      alert("Achievement updated");
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to update achievement");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAchievement = async (id) => {
    if (!confirm("Delete this achievement?")) return;
    try {
      setLoading(true);
      await achievementsAPI.delete(id);
      setAchievements((prev) => prev.filter((a) => a._id !== id));
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (formData) => {
    try {
      setLoading(true);
      const res = await projectsAPI.create(formData);
      const created = res.data || res;
      setProjects((prev) => [...prev, created]);
      alert("Project created");
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to create project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, formData) => {
    try {
      setLoading(true);
      const res = await projectsAPI.update(id, formData);
      const updated = res.data || res;
      setProjects((prev) => prev.map((it) => (it._id === id ? updated : it)));
      alert("Project updated");
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to update project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      setLoading(true);
      await projectsAPI.delete(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalType("create");
    setEditingItem(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 sm:pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto mt-6 sm:mt-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        </div>

        <div className="flex gap-2 sm:gap-4 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "achievements"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <Star size={18} />
              Achievements
            </span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "projects"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <ImageIcon size={18} />
              Projects
            </span>
          </button>
        </div>

        <div>
          {activeTab === "achievements" ? (
            <AchievementManager
              achievements={achievements}
              openModal={openModal}
              deleteAchievement={deleteAchievement}
              loading={loading}
            />
          ) : (
            <ProjectManager
              projects={projects}
              openModal={openModal}
              deleteProject={deleteProject}
              loading={loading}
            />
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={closeModal}
          modalType={modalType}
          editingItem={editingItem}
          type={activeTab}
          createAchievement={createAchievement}
          updateAchievement={updateAchievement}
          createProject={createProject}
          updateProject={updateProject}
        />
      )}
    </div>
  );
};

/* ---------------- Achievement Manager ---------------- */
const AchievementManager = ({ achievements, openModal, deleteAchievement, loading }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <p className="text-gray-400 text-sm mt-1">{achievements.length} total achievements</p>
        </div>

        <button
          onClick={() => openModal("create")}
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
        >
          <Plus size={20} /> Add Achievement
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {achievements.map((item) => (
          <div
            key={item._id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-yellow-400/30"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {item.images && item.images.length > 0 && (
                <div className="flex gap-2">
                  {item.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="w-24 h-24 flex-shrink-0">
                      <img
                        src={img}
                        alt={`${item.title} ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-white/10"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex-1">
                <div className="flex gap-2 items-center mb-2 flex-wrap">
                  <h3 className="text-xl text-white font-bold">{item.title}</h3>
                  {item.featured && <Star className="text-yellow-400 fill-yellow-400" size={16} />}
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-3">{item.description}</p>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">{item.category}</span>
                  <span className="text-gray-400">{item.issuer}</span>
                  <span className="text-gray-400">{item.date ? new Date(item.date).toLocaleDateString() : ""}</span>
                </div>

                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.skills.map((skill, i) => (
                      <span key={i} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => openModal("edit", item)}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => deleteAchievement(item._id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {achievements.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">
            <Star size={48} className="mx-auto mb-4 opacity-20" />
            <p>No achievements yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- Project Manager ---------------- */
const ProjectManager = ({ projects, openModal, deleteProject, loading }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} total projects</p>
        </div>

        <button
          onClick={() => openModal("create")}
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-yellow-400/30"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 w-full lg:w-64">
                  {project.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="aspect-video">
                      <img
                        src={img}
                        alt={`${project.title} ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-white/10"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex-1">
                <div className="flex gap-2 items-center mb-2 flex-wrap">
                  <h3 className="text-xl text-white font-bold">{project.title}</h3>
                  {project.featured && <Star className="text-yellow-400 fill-yellow-400" size={16} />}
                </div>

                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">{project.category}</span>

                <p className="text-gray-400 text-sm mt-3 mb-3">{project.description}</p>

                <div className="flex gap-2 flex-wrap">
                  {project.techStack && project.techStack.map((tech, i) => (
                    <span key={i} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>

                <div className="flex gap-3 mt-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                      <ExternalLink size={14} /> GitHub
                    </a>
                  )}
                  {project.videoUrl && (
                    <span className="text-purple-400 text-sm flex items-center gap-1"><Video size={14} /> Demo Video</span>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => openModal("edit", project)}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => deleteProject(project._id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p>No projects yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- Modal Component ---------------- */
const Modal = ({
  closeModal,
  modalType,
  editingItem,
  type,
  createAchievement,
  updateAchievement,
  createProject,
  updateProject,
}) => {
  const isAchievement = type === "achievements";
  const maxImages = isAchievement ? 3 : 10;

  const empty = {
    title: "",
    description: "",
    category: "",
    issuer: "",
    date: "",
    credentialId: "",
    credentialUrl: "",
    images: [], 
    skills: [],
    award: "",
    featured: false,
    order: 0,
    status: "active",
    longDescription: "",
    techStack: [],
    github: "",
    videoUrl: "",
  };

  const [formData, setFormData] = useState(editingItem ? normalizeEditingItem(editingItem) : empty);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData(editingItem ? normalizeEditingItem(editingItem) : empty);
  }, [editingItem]);

  function normalizeEditingItem(item) {
    return {
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      issuer: item.issuer || "",
      date: item.date ? item.date.substring(0, 10) : "",
      credentialId: item.credentialId || "",
      credentialUrl: item.credentialUrl || "",
      images: item.images ? [...item.images] : [],
      skills: item.skills ? [...item.skills] : [],
      award: item.award || "",
      featured: !!item.featured,
      order: item.order ?? 0,
      status: item.status || "active",
      longDescription: item.longDescription || item.long_description || "",
      techStack: item.techStack ? [...item.techStack] : item.tech_stack ? [...item.tech_stack] : [],
      github: item.github || "",
      videoUrl: item.videoUrl || item.video_url || "",
      _id: item._id,
    };
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const currentImages = formData.images || [];

    const existingCount = currentImages.length;
    if (existingCount + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }
    setFormData({ ...formData, images: [...currentImages, ...files] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const validateBeforeSubmit = () => {
    // Basic front-end validation to avoid 400
    if (!formData.title?.trim()) {
      alert("Title is required");
      return false;
    }
    if (!formData.description?.trim()) {
      alert("Description is required");
      return false;
    }
    if (isAchievement) {
      if (!formData.category) {
        alert("Please select a valid category");
        return false;
      }
      if (!formData.issuer?.trim()) {
        alert("Issuer is required");
        return false;
      }
      if (!formData.date) {
        alert("Date is required");
        return false;
      }
    } else {
      if (!formData.title?.trim() || !formData.description?.trim()) {
        alert("Title and description are required for projects");
        return false;
      }
    }
    return true;
  };

  const convertToFormData = (data) => {
    const fd = new FormData();

    const simpleFields = ["title", "description", "issuer", "date", "credentialId", "credentialUrl", "award", "order", "status", "featured", "github", "videoUrl", "longDescription", "_id"];
    simpleFields.forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        // keep boolean and numbers as is
        fd.append(key, typeof data[key] === "boolean" || typeof data[key] === "number" ? String(data[key]) : data[key]);
      }
    });

    // category
    if (data.category) fd.append("category", data.category);

    // arrays: skills, techStack
    if (Array.isArray(data.skills)) {
      data.skills.forEach((s) => fd.append("skills[]", s));
    }
    if (Array.isArray(data.techStack)) {
      data.techStack.forEach((t) => fd.append("techStack[]", t));
    }

    (data.images || []).forEach((img) => {
      if (typeof img === "string") {
        fd.append("existingImages", img);
      } else {
        // assume File
        fd.append("images", img);
      }
    });

    return fd;
  };

  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) return;

    setSubmitting(true);

    try {
      const fd = convertToFormData(formData);

      if (isAchievement) {
        if (modalType === "create") {
          await createAchievement(fd);
        } else {
          await updateAchievement(formData._id, fd);
        }
      } else {
        if (modalType === "create") {
          await createProject(fd);
        } else {
          await updateProject(formData._id, fd);
        }
      }

      closeModal();
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-white/20 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex justify-between items-center border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">{modalType === "create" ? "Create" : "Edit"} {isAchievement ? "Achievement" : "Project"}</h2>
            <p className="text-gray-400 text-sm mt-1">Fill in the details below</p>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"><X size={24} /></button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Title *</label>
                <input
                  className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Description *</label>
                <textarea
                  className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition min-h-[100px]"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Category *</label>
                <select
                  className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {(isAchievement ? ACHIEVEMENT_CATEGORIES : PROJECT_CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Multiple Images Upload */}
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  {isAchievement ? `Certificate Images (Max ${maxImages})` : `Project Images (Max ${maxImages})`}
                </label>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-4 hover:border-yellow-400 transition">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUploadModal"
                    disabled={(formData.images || []).length >= maxImages}
                  />
                  <label
                    htmlFor="imageUploadModal"
                    className={`cursor-pointer flex flex-col items-center gap-2 ${ (formData.images || []).length >= maxImages ? "opacity-50 cursor-not-allowed" : "" }`}
                  >
                    <Upload className="text-gray-400" size={32} />
                    <span className="text-gray-400 text-sm text-center">
                      { (formData.images || []).length >= maxImages
                        ? `Maximum ${maxImages} images reached`
                        : `Click to upload images (${(formData.images || []).length}/${maxImages})` }
                    </span>
                  </label>
                </div>

                {/* Image Previews */}
                {(formData.images || []).length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        {typeof img === "string" ? (
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <img src={URL.createObjectURL(img)} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        )}
                        <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                          <XCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {isAchievement ? (
                <>
                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Issuer *</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="e.g., Coursera, Google"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Date *</label>
                    <input
                      type="date"
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Credential ID</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="Enter credential ID"
                      value={formData.credentialId}
                      onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Credential URL</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="https://..."
                      value={formData.credentialUrl}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Skills</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="React, Node.js, Python (comma separated)"
                      value={(formData.skills || []).join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Award</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="e.g., With Distinction"
                      value={formData.award}
                      onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Long Description</label>
                    <textarea
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition min-h-[100px]"
                      placeholder="Detailed project description"
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Tech Stack</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="React, Node.js, MongoDB (comma separated)"
                      value={(formData.techStack || []).join(", ")}
                      onChange={(e) =>
                        setFormData({ ...formData, techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">GitHub URL</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="https://github.com/..."
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-2 flex items-center gap-2"><Video size={16} /> YouTube Demo URL</label>
                    <input
                      className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    />
                    {formData.videoUrl && extractYouTubeId(formData.videoUrl) && (
                      <div className="mt-3">
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoUrl)}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                          title="YouTube preview"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">Order</label>
                  <input
                    type="number"
                    className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value || 0) })}
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">Status</label>
                  <select
                    className="bg-gray-800 border border-white/10 p-3 rounded-lg w-full text-white focus:border-yellow-400 focus:outline-none transition"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {isAchievement ? (
                      <>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="archived">Archived</option>
                      </>
                    ) : (
                      <>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="archived">Archived</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Star size={16} className={formData.featured ? "fill-yellow-400 text-yellow-400" : ""} />
                  Featured
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 border-t border-white/10 p-6 flex gap-3">
          <button onClick={closeModal} className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : (modalType === "create" ? "Create" : "Update")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
