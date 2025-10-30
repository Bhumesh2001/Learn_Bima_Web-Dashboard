import React from "react";

export default function SettingsPage({ settings, setSettings }) {
    const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

    const options = [
        {
            key: "maintenance",
            title: "Enable Maintenance Mode",
            desc: "Put site in maintenance for updates",
        },
        {
            key: "registration",
            title: "Enable Registration",
            desc: "Allow new users to register",
        },
    ];

    return (
        <div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6 transition-all">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h2>
                {options.map((opt) => (
                    <div
                        key={opt.key}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        <div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">{opt.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</div>
                        </div>
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings[opt.key]}
                                onChange={() => toggle(opt.key)}
                            />
                            <div className="w-14 h-7 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-500 transition-all"></div>
                            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-7 transition-transform"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
