import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Save, RefreshCw, Database, Shield, Bell, Globe } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-primary" />
          系统设置 (System Settings)
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-primary hover:bg-primary/80 text-background font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? '保存中...' : '保存更改'}
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-64 glass-panel rounded-xl border border-border flex flex-col p-4 gap-2">
          {[
            { id: 'general', icon: Globe, label: '通用设置' },
            { id: 'security', icon: Shield, label: '安全与访问' },
            { id: 'database', icon: Database, label: '数据保留' },
            { id: 'notifications', icon: Bell, label: '告警通知' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 glass-panel rounded-xl border border-border p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'general' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-border pb-2">平台配置</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">平台名称</label>
                      <input type="text" defaultValue="网络设备管理平台" className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">时区</label>
                      <select className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none">
                        <option>Asia/Shanghai (UTC+8)</option>
                        <option>America/New_York (UTC-5)</option>
                        <option>Europe/London (UTC+0)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-light/30 border border-border rounded-lg">
                      <div>
                        <h4 className="text-sm font-bold text-white">维护模式</h4>
                        <p className="text-xs text-slate-400 mt-1">暂停所有非管理员访问和后台任务。</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-border pb-2">认证与安全</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface-light/30 border border-border rounded-lg">
                      <div>
                        <h4 className="text-sm font-bold text-white">双因素认证 (2FA)</h4>
                        <p className="text-xs text-slate-400 mt-1">要求所有管理员使用 2FA 登录。</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">会话超时 (分钟)</label>
                      <input type="number" defaultValue="30" className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">密码策略</label>
                      <select className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none">
                        <option>严格 (最少 12 字符，包含大小写、数字、符号)</option>
                        <option>中等 (最少 8 字符，包含字母数字)</option>
                        <option>基础 (最少 8 字符)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-border pb-2">数据保留策略</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">性能指标保留</label>
                      <select className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none">
                        <option>30 天</option>
                        <option>90 天</option>
                        <option>1 年</option>
                        <option>永久</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">告警历史保留</label>
                      <select className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none">
                        <option>90 天</option>
                        <option>180 天</option>
                        <option>1 年</option>
                      </select>
                    </div>
                    <div className="mt-6 p-4 bg-danger/10 border border-danger/30 rounded-lg">
                      <h4 className="text-sm font-bold text-danger mb-2">危险区域</h4>
                      <p className="text-xs text-slate-400 mb-4">永久删除所有历史性能和告警数据。此操作无法撤销。</p>
                      <button className="px-4 py-2 bg-danger hover:bg-danger/80 text-white text-sm font-bold rounded-lg transition-colors">
                        清除历史数据
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-border pb-2">告警通知设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface-light/30 border border-border rounded-lg">
                      <div>
                        <h4 className="text-sm font-bold text-white">邮件通知</h4>
                        <p className="text-xs text-slate-400 mt-1">将严重告警发送至管理员邮箱。</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-light/30 border border-border rounded-lg">
                      <div>
                        <h4 className="text-sm font-bold text-white">Webhook 集成</h4>
                        <p className="text-xs text-slate-400 mt-1">将告警数据发送至外部系统 (如企业微信、钉钉)。</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-slate-400 font-medium">触发通知的最低告警级别</label>
                      <select className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 appearance-none">
                        <option>仅严重 (Critical)</option>
                        <option>重要及严重 (Major & Critical)</option>
                        <option>所有告警</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
