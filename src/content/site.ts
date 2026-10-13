export type Locale = 'zh' | 'en';

export const siteMeta = {
  brand: 'xyodfish',
  github: 'https://github.com/xyodfish',
  githubPages: 'https://xyodfish.github.io',
};

type Media = {
  src: string;
  alt: string;
};

export type FeaturedProject = {
  name: string;
  role: string;
  summary: string;
  tags: string[];
  proofs: string[];
  href: string;
  media?: Media;
};

type ToolProject = {
  name: string;
  role: string;
  summary: string;
  tags: string[];
  media?: Media;
};

type Clip = {
  src: string;
  caption: string;
  context: string;
};

type Copy = {
  meta: { title: string; description: string };
  nav: {
    work: string;
    atlas: string;
    evidence: string;
    demos: string;
    about: string;
    contact: string;
    langOther: string;
    langHref: string;
  };
  hero: {
    role: string;
    lead: string;
    support: string;
    ctaGithub: string;
    ctaWork: string;
    mediaCaption: string;
    signals: { value: string; label: string }[];
  };
  work: {
    title: string;
    intro: string;
    detailCta: string;
  };
  featured: FeaturedProject[];
  systems: {
    title: string;
    intro: string;
    items: ToolProject[];
  };
  clips: Clip[];
  about: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    stackLabel: string;
    stackItems: string[];
  };
  contact: { title: string; body: string; github: string };
  footer: { note: string };
};

export const copy: Record<Locale, Copy> = {
  zh: {
    meta: {
      title: 'xyodfish · 机器人遥操作与运动系统',
      description: '从视觉与动捕输入、动作重定向和全身跟踪，到 C++ 运行时、仿真验证与部署。',
    },
    nav: {
      work: '案例',
      atlas: '系统图谱',
      evidence: '证据',
      demos: '片段',
      about: '方法',
      contact: '联系',
      langOther: 'EN',
      langHref: '/en/',
    },
    hero: {
      role: '机器人遥操作与运动系统',
      lead: '把人体动作变成机器人可执行的运动。',
      support: '从视觉与动捕输入、动作重定向和全身跟踪，到 C++ 运行时、仿真验证与部署。',
      ctaGithub: 'GitHub',
      ctaWork: '查看案例',
      mediaCaption: 'RealSense / MediaPipe → G1 arm IK',
      signals: [
        { value: 'G1 / H2', label: '机器人平台' },
        { value: '视觉 / 动捕', label: '人体动作输入' },
        { value: '训练 → 运行', label: '完整工作链路' },
        { value: '仿真 / 真机接口', label: '验证与集成' },
      ],
    },
    work: {
      title: '系统案例',
      intro: '不按仓库罗列功能，而是说明每条系统链路解决了什么、我负责什么，以及证据和边界在哪里。',
      detailCta: '阅读案例',
    },
    featured: [
      {
        name: 'PUPPET',
        role: '遥操作运行时',
        summary:
          '把相机、动捕和文件回放接进同一套遥操作流程，再按机器人和任务选择不同的动作重定向方法。更换输入设备或求解器时，不需要重写整条系统。',
        tags: ['Runtime', 'Retargeting', 'C++'],
        proofs: ['视觉、动捕与回放共用一套入口', '支持 G1 / H2', 'C++ 重定向平均 1.77 ms*'],
        href: '/work/puppet/',
        media: { src: '/media/vision-teleop.mp4', alt: '视觉遥操作驱动 G1 右臂' },
      },
      {
        name: 'H2 Motion Tracking',
        role: '全身动作策略训练',
        summary:
          '为 H2 设计并训练一套 31 关节全身跟踪策略：从动作数据、训练输入和奖励，到困难样本采样、恢复训练和固定测试集评估。训练完成后再导出到 C++ 做独立回放验证。',
        tags: ['Reinforcement Learning', 'Motion Tracking', 'H2'],
        proofs: ['2,810 条训练动作', '31 关节 / 50 Hz 控制', '固定动作与扰动测试共同选权重'],
        href: '/work/h2-motion-tracking/',
        media: { src: '/media/gmt-h2-multistyle.mp4', alt: 'H2 多风格全身跟踪' },
      },
      {
        name: 'G1 Motion Tracking',
        role: '大规模动作策略训练',
        summary:
          '把 2,730 条动作放进同一个 29 关节因果时序策略，并用固定训练外动作检查姿态、移动、手脚、接触和稳定性。默认权重按综合行为选择，而不是直接使用最后一轮。',
        tags: ['Reinforcement Learning', 'Temporal Policy', 'G1'],
        proofs: ['2,730 条动作统一训练', '29 关节 / 50 Hz 控制', '20 条固定训练外动作评测'],
        href: '/work/g1-motion-tracking/',
        media: { src: '/media/gmt-g1-mix.mp4', alt: 'G1 多动作全身跟踪' },
      },
      {
        name: 'Trajectory Repair',
        role: '局部碰撞修复',
        summary:
          '在尽量保留原规划结果的前提下，只修复发生碰撞的局部路段。修复前先判断问题是否适合局部处理，修复后重新检查碰撞、终点误差和执行速度。',
        tags: ['HQP', 'Collision', 'TOPPRA'],
        proofs: ['只修改局部碰撞窗口', '每次路径变化后重新验收', '支持 x86_64 / arm64'],
        href: '/work/trajectory-repair/',
        media: { src: '/media/hpn-traj.mp4', alt: '规划轨迹局部碰撞修复' },
      },
    ],
    systems: {
      title: '工程工具',
      intro: '为运动系统补齐观察、复现、批处理和公平比较能力。',
      items: [
        {
          name: 'PIVOT',
          role: '运动学调试工作台',
          summary: '把姿态、IK、轨迹、障碍物、碰撞距离和调试会话放进同一个可回放工作台。',
          tags: ['IK', 'Viewer', 'Replay'],
          media: { src: '/media/pivot-viewer.mp4', alt: 'PIVOT 运动学调试界面' },
        },
        {
          name: 'MotionBridge',
          role: '重定向与机器人间迁移',
          summary: '同一套 CLI / WebUI 覆盖多种人体输入与 G1 / H2，并能借鉴 UMR Online QP，把已有的 G1 关节轨迹迁移为 H2 轨迹后同屏复核。',
          tags: ['WebUI', 'G1 → H2', 'Retargeting'],
        },
        {
          name: 'Policy Compare',
          role: '多策略 Sim2Sim 对比',
          summary: '在同一 MuJoCo 场景和共享参考下比较 GMT、Teleopit、SONIC 等跟踪策略。',
          tags: ['Evaluation', 'MuJoCo', 'ONNX'],
          media: { src: '/media/gmt-h2-tracking.mp4', alt: '策略跟踪与参考对比' },
        },
        {
          name: 'Retarget Arena',
          role: '可解释重定向评测',
          summary: '用显式模型和逐项指标比较重定向结果；缺失证据保持不可用，不合成总分。',
          tags: ['Metrics', 'Validation'],
          media: { src: '/media/online-qp-compare.mp4', alt: 'UMR 与 GMR Online QP 对比' },
        },
      ],
    },
    clips: [
      { src: '/media/vision-teleop.mp4', caption: '视觉遥操作', context: 'RealSense → G1 arm IK' },
      { src: '/media/online-qp-compare.mp4', caption: '在线重定向对比', context: 'UMR / GMR Online QP' },
      { src: '/media/gmt-h2-multistyle.mp4', caption: 'H2 多风格跟踪', context: '50 Hz policy rollout' },
      { src: '/media/gmt-g1-mix.mp4', caption: 'G1 全身跟踪', context: '2,730-motion policy' },
      { src: '/media/hpn-traj.mp4', caption: '局部轨迹修复', context: 'HQP projection' },
      { src: '/media/pivot-viewer.mp4', caption: '运动学调试', context: 'PIVOT workbench' },
      { src: '/media/chassis-plan.mp4', caption: '四舵轮规划', context: 'Hybrid A* + optimization' },
    ],
    about: {
      title: '工程判断比技术标签更重要。',
      intro: '我更关心接口是否清楚、时序是否稳定，以及一个结果究竟证明了什么。',
      steps: [
        { title: '先固定数据契约', body: '输入、输出、坐标系、关节顺序和时间基准先明确，再谈算法替换。' },
        { title: '让模块可以独立替换', body: '设备、求解器、通信和控制后端通过稳定边界组合，而不是彼此硬编码。' },
        { title: '比较时只改变一个问题', body: '保留相同参考、模型和评价条件，区分训练差异、接口错误与物理后端差异。' },
        { title: '明确结果边界', body: '运动学回放、sim2sim 和真机验证分别表述；没有证据的指标不使用默认值补齐。' },
      ],
      stackLabel: '常用技术',
      stackItems: ['C++', 'Python', 'MuJoCo', 'Pinocchio', 'ONNX Runtime', 'HQP / QP', 'CMake', 'Conan'],
    },
    contact: {
      title: '聊聊机器人运动。',
      body: '如果你在做遥操作、动作重定向、全身跟踪或机器人控制运行时，欢迎通过 GitHub 联系。',
      github: 'GitHub',
    },
    footer: { note: 'Human motion → executable robot motion.' },
  },
  en: {
    meta: {
      title: 'xyodfish · Robot Teleoperation & Motion Systems',
      description: 'From vision and mocap input through retargeting and whole-body tracking to C++ runtime, simulation validation, and deployment.',
    },
    nav: {
      work: 'Cases',
      atlas: 'System maps',
      evidence: 'Evidence',
      demos: 'Clips',
      about: 'Method',
      contact: 'Contact',
      langOther: '中文',
      langHref: '/',
    },
    hero: {
      role: 'Robot teleoperation & motion systems',
      lead: 'Turning human motion into executable robot motion.',
      support: 'From vision and mocap input through retargeting and whole-body tracking to C++ runtime, simulation validation, and deployment.',
      ctaGithub: 'GitHub',
      ctaWork: 'View cases',
      mediaCaption: 'RealSense / MediaPipe → G1 arm IK',
      signals: [
        { value: 'G1 / H2', label: 'Robot platforms' },
        { value: 'Vision / mocap', label: 'Human motion input' },
        { value: 'Train → runtime', label: 'End-to-end workflow' },
        { value: 'Sim / hardware I/O', label: 'Validation & integration' },
      ],
    },
    work: {
      title: 'System cases',
      intro: 'Not a repository inventory: each case states the problem, my scope, the evidence, and the boundary of the result.',
      detailCta: 'Read the case',
    },
    featured: [
      {
        name: 'PUPPET',
        role: 'Teleoperation runtime',
        summary:
          'Brings cameras, mocap, and recorded motion into one teleoperation flow, then selects a retargeting method for each robot and task. Inputs and solvers can change without rebuilding the full system.',
        tags: ['Runtime', 'Retargeting', 'C++'],
        proofs: ['One entry for vision, mocap & replay', 'G1 / H2 support', '1.77 ms mean C++ retargeting*'],
        href: '/work/puppet/',
        media: { src: '/media/vision-teleop.mp4', alt: 'Vision teleoperation driving a G1 right arm' },
      },
      {
        name: 'H2 Motion Tracking',
        role: 'Whole-body policy training',
        summary:
          'Designed and trained a 31-joint H2 whole-body tracker, covering motion data, policy inputs, rewards, hard-sample scheduling, recovery training, and fixed-suite evaluation. The trained policy was then exported for independent C++ replay.',
        tags: ['Reinforcement Learning', 'Motion Tracking', 'H2'],
        proofs: ['2,810 training motions', '31 joints at 50 Hz', 'Fixed and perturbed checkpoint tests'],
        href: '/work/h2-motion-tracking/',
        media: { src: '/media/gmt-h2-multistyle.mp4', alt: 'H2 multi-style whole-body tracking' },
      },
      {
        name: 'G1 Motion Tracking',
        role: 'Large-scale motion policy training',
        summary:
          'Trains one causal 29-joint policy on 2,730 motions, then checks pose, travel, hands, feet, contact, and stability on a fixed held-out suite. The default checkpoint is selected by overall behavior, not simply by being last.',
        tags: ['Reinforcement Learning', 'Temporal Policy', 'G1'],
        proofs: ['2,730 motions in one policy', '29 joints at 50 Hz', '20 fixed held-out motions'],
        href: '/work/g1-motion-tracking/',
        media: { src: '/media/gmt-g1-mix.mp4', alt: 'G1 multi-motion whole-body tracking' },
      },
      {
        name: 'Trajectory Repair',
        role: 'Local collision repair',
        summary:
          'Repairs only the colliding section while preserving the useful structure of an existing plan. It first decides whether local repair is appropriate, then rechecks collision, goal error, and execution timing.',
        tags: ['HQP', 'Collision', 'TOPPRA'],
        proofs: ['Local collision-window edits', 'Revalidation after every path change', 'x86_64 / arm64'],
        href: '/work/trajectory-repair/',
        media: { src: '/media/hpn-traj.mp4', alt: 'Local collision repair for a planned trajectory' },
      },
    ],
    systems: {
      title: 'Engineering tools',
      intro: 'Tools that make motion systems observable, reproducible, batchable, and comparable.',
      items: [
        {
          name: 'PIVOT',
          role: 'Kinematics workbench',
          summary: 'Pose, IK, trajectories, obstacles, distance monitoring, and replayable debug sessions in one workbench.',
          tags: ['IK', 'Viewer', 'Replay'],
          media: { src: '/media/pivot-viewer.mp4', alt: 'PIVOT kinematics workbench' },
        },
        {
          name: 'MotionBridge',
          role: 'Retargeting & robot transfer',
          summary: 'One CLI / WebUI across human inputs and G1 / H2, including a UMR Online QP-inspired path that transfers an existing G1 joint trajectory to H2 for side-by-side review.',
          tags: ['WebUI', 'G1 → H2', 'Retargeting'],
        },
        {
          name: 'Policy Compare',
          role: 'Multi-policy sim2sim',
          summary: 'Compares GMT, Teleopit, SONIC, and other trackers in one MuJoCo scene against a shared reference.',
          tags: ['Evaluation', 'MuJoCo', 'ONNX'],
          media: { src: '/media/gmt-h2-tracking.mp4', alt: 'Policy tracking against a shared reference' },
        },
        {
          name: 'Retarget Arena',
          role: 'Explainable retarget evaluation',
          summary: 'Compares retargeted motion on an explicit model with per-metric evidence; unavailable evidence stays unavailable.',
          tags: ['Metrics', 'Validation'],
          media: { src: '/media/online-qp-compare.mp4', alt: 'UMR and GMR Online QP comparison' },
        },
      ],
    },
    clips: [
      { src: '/media/vision-teleop.mp4', caption: 'Vision teleoperation', context: 'RealSense → G1 arm IK' },
      { src: '/media/online-qp-compare.mp4', caption: 'Online retarget comparison', context: 'UMR / GMR Online QP' },
      { src: '/media/gmt-h2-multistyle.mp4', caption: 'H2 multi-style tracking', context: '50 Hz policy rollout' },
      { src: '/media/gmt-g1-mix.mp4', caption: 'G1 whole-body tracking', context: '2,730-motion policy' },
      { src: '/media/hpn-traj.mp4', caption: 'Local trajectory repair', context: 'HQP projection' },
      { src: '/media/pivot-viewer.mp4', caption: 'Kinematics debugging', context: 'PIVOT workbench' },
      { src: '/media/chassis-plan.mp4', caption: 'Four-steer planning', context: 'Hybrid A* + optimization' },
    ],
    about: {
      title: 'Engineering judgment over technology labels.',
      intro: 'I care whether interfaces are explicit, timing is stable, and a result proves exactly what it claims.',
      steps: [
        { title: 'Fix the data contract first', body: 'Inputs, outputs, frames, joint order, and timebase come before swapping algorithms.' },
        { title: 'Keep modules replaceable', body: 'Devices, solvers, transports, and control backends compose through stable boundaries.' },
        { title: 'Change one question at a time', body: 'Hold references, models, and evaluation conditions fixed to separate training, interface, and physics effects.' },
        { title: 'State the evidence boundary', body: 'Kinematic playback, sim2sim, and hardware evidence are named separately; missing metrics are not filled with defaults.' },
      ],
      stackLabel: 'Working stack',
      stackItems: ['C++', 'Python', 'MuJoCo', 'Pinocchio', 'ONNX Runtime', 'HQP / QP', 'CMake', 'Conan'],
    },
    contact: {
      title: 'Let’s talk robot motion.',
      body: 'If you are working on teleoperation, motion retargeting, whole-body tracking, or robot control runtimes, reach me on GitHub.',
      github: 'GitHub',
    },
    footer: { note: 'Human motion → executable robot motion.' },
  },
};
