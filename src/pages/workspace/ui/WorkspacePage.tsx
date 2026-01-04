import {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const WorkspacePage = () => {
    const [activeTab, setActiveTab] = useState<'herd' | 'settings' | 'reports'>('herd');
    const navigate = useNavigate();

    const handleTabClick = (tab: 'herd' | 'settings' | 'reports') => {
        setActiveTab(tab);
        navigate(tab === 'herd' ? 'herd' : tab === 'settings' ? 'settings' : 'reports');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mx-6 mt-6">
                <header className="top-bar-glass">
                    <div className="text-white font-bold text-lg">Логотип</div>
                    <div className="text-white font-medium">Имя пользователя</div>
                </header>
            </div>

            <div className="flex flex-1 mx-6 my-6 gap-6">
                <aside className="sidebar-glass">
                    <button
                        onClick={() => handleTabClick('herd')}
                        className={`nav-btn-glass ${activeTab === 'herd' ? 'nav-btn-glass-active' : ''}`}
                    >
                        Табуны
                    </button>
                    <button
                        onClick={() => handleTabClick('settings')}
                        className={`nav-btn-glass ${activeTab === 'settings' ? 'nav-btn-glass-active' : ''} mb-2`}
                    >
                        Настройки
                    </button>
                    <button
                        onClick={() => handleTabClick('reports')}
                        className={`nav-btn-glass ${activeTab === 'reports' ? 'nav-btn-glass-active' : ''}`}
                    >
                        Отчеты
                    </button>
                </aside>

                <main className="main-glass flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default WorkspacePage;