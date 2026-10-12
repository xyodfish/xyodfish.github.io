export type Locale = 'zh' | 'en';

export const siteMeta = {
  brand: 'xyodfish',
  github: 'https://github.com/xyodfish',
  githubPages: 'https://xyodfish.github.io',
};

export type FeaturedProject = {
  name: string;
  role: string;
  summary: string;
  bullets: string[];
  tags: string[];
  media?: {
    src: string;
    alt: string;
  };
};

type DemoItem = {
  kind: 'video' | 'image';
  src: string;
  caption: string;
};

type Copy = {
  meta: { title: string; description: string };
  nav: {
    work: string;
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
  };
  flow: { steps: string[] };
  work: { title: string; intro: string };
  featured: FeaturedProject[];
  systems: {
    title: string;
    intro: string;
    items: FeaturedProject[];
  };
  demoGroups: { label: string; items: DemoItem[] }[];
  more: {
    title: string;
    items: { name: string; summary: string; tags: string[] }[];
  };
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
      title: 'xyodfish · 机器人软件与运控',
      description:
        '机器人软件与运动控制：遥操作、全身跟踪、运动规划与可部署控制链路。',
    },
    nav: {
      work: '项目',
      demos: '片段',
      about: '关于',
      contact: '联系',
      langOther: 'EN',
      langHref: '/en/',
    },
    hero: {
      role: '机器人软件 / 运控工程师',
      lead: '遥操作、全身跟踪、运动规划与全身控制——做成能上真机的软件。',
      support: '训练、联调、部署一条链路做完，不停留在 demo。',
      ctaGithub: 'GitHub',
      ctaWork: '看项目',
    },
    flow: {
      steps: ['遥操作 / 输入', '运控与跟踪', '运动规划', '部署 / 真机'],
    },
    work: {
      title: '项目',
      intro: '代表作优先：遥操作 runtime、全身跟踪训练到部署、轨迹优化与全身控制。',
    },
    featured: [
      {
        name: 'PUPPET',
        role: '遥操作 Runtime',
        summary:
          '难点在多源输入（动捕 / 视觉 / 回放）时间对齐后仍要稳定下发。我搭了统一 runtime，并把 RealSense + MediaPipe 视觉遥操与 Online QP / SOMA 求解做成可切换插件。已接到仿真与真机后端联调。',
        bullets: [],
        tags: ['Teleop', 'Vision', 'Runtime'],
        media: { src: '/media/vision-teleop.mp4', alt: 'PUPPET vision teleop' },
      },
      {
        name: 'GMT · teleop-rl',
        role: '全身跟踪：训练到部署',
        summary:
          '难点是跟踪策略从训练到真机中间的 sim2sim 落差与多风格泛化。我负责 GMT 训练、评测与 teleop-rl 部署栈，覆盖 G1 / H2 的 walk–dance–mix、held-out 与外场动捕联调。最终落到可跟遥操作共用的真机跟踪链路。',
        bullets: [],
        tags: ['GMT', 'teleop-rl', 'Training', 'Deploy'],
        media: { src: '/media/gmt-h2-multistyle.mp4', alt: 'GMT H2 multistyle tracking' },
      },
      {
        name: 'Trajectory Optimizer',
        role: '运动规划后处理',
        summary:
          '规划输出常带局部碰撞与约束违反，直接执行不可靠。我做了 HQP 全身投影 + SQP 几何修复的后处理：分段判断可修性，再局部优化拼回。已用于手臂 / 底盘多链规划交付。',
        bullets: [],
        tags: ['HQP', 'SQP', 'Planning'],
        media: { src: '/media/hpn-traj.mp4', alt: 'HPN trajectory optimizer' },
      },
      {
        name: 'wbc-fsm',
        role: '全身控制与状态机',
        summary:
          '难点是实时动捕进控制环时，状态切换与重定向求解要同一节拍。我实现 WBC × FSM，并接入 Noitom BVH 与 Online QP，带原始骨架 / H2 Mesh 同屏联调。落到 H2 在线姿态闭环。',
        bullets: [],
        tags: ['WBC', 'FSM', 'Noitom'],
        media: { src: '/media/noitom-h2-mesh.mp4', alt: 'H2 Online QP live mesh' },
      },
    ],
    systems: {
      title: '更多工具',
      intro: '求解、底盘规划、运动学调试与重定向工作台。',
      items: [
        {
          name: 'Online QP',
          role: '流式运动求解',
          summary: '短时域 QP + 接触约束，进程内服务连续遥操与流式回放。',
          bullets: [],
          tags: ['Online QP', 'qpOASES'],
          media: { src: '/media/online-qp-compare.mp4', alt: 'UMR vs GMR Online QP compare' },
        },
        {
          name: '舵轮规划',
          role: '四舵轮 Hybrid A*',
          summary: 'Hybrid A* + 连续优化，生成可执行的独立转向底盘轨迹。',
          bullets: [],
          tags: ['Hybrid A*', 'Chassis'],
          media: { src: '/media/chassis-plan.mp4', alt: 'Steering-wheel chassis planning' },
        },
        {
          name: 'PIVOT',
          role: '运动学调试工作台',
          summary: '姿态、IK、轨迹与近碰撞监控集中在同一界面。',
          bullets: [],
          tags: ['Viewer', 'IK'],
          media: { src: '/media/pivot-kinematic.mp4', alt: 'PIVOT kinematic viewer' },
        },
        {
          name: 'MotionBridge',
          role: '动作重定向 WebUI',
          summary: '统一输入与机型选择，CLI / C++ 后端跑 online / batch。',
          bullets: [],
          tags: ['WebUI', 'Retarget'],
        },
      ],
    },
    demoGroups: [
      {
        label: 'PUPPET · Online QP',
        items: [
          { kind: 'video', src: '/media/vision-teleop.mp4', caption: '视觉遥操' },
          { kind: 'video', src: '/media/online-qp-compare.mp4', caption: 'UMR vs GMR Online QP' },
          { kind: 'video', src: '/media/noitom-live-bvh.mp4', caption: 'Noitom BVH 实时骨架' },
          { kind: 'video', src: '/media/noitom-h2-mesh.mp4', caption: 'H2 Online QP 实时渲染' },
        ],
      },
      {
        label: '规划与工具',
        items: [
          { kind: 'video', src: '/media/hpn-traj.mp4', caption: '轨迹优化' },
          { kind: 'video', src: '/media/chassis-plan.mp4', caption: '舵轮规划' },
          { kind: 'video', src: '/media/pivot-kinematic.mp4', caption: 'PIVOT' },
        ],
      },
      {
        label: 'GMT · teleop-rl',
        items: [
          { kind: 'video', src: '/media/gmt-h2-multistyle.mp4', caption: 'H2 多风格跟踪' },
          { kind: 'video', src: '/media/gmt-h2-field.mp4', caption: 'H2 外场动捕' },
          { kind: 'video', src: '/media/gmt-h2-tracking.mp4', caption: 'H2 tracking vs ref' },
          { kind: 'video', src: '/media/gmt-g1-walk.mp4', caption: 'G1 行走' },
        ],
      },
    ],
    more: {
      title: '其他',
      items: [
        { name: 'TENDRA', summary: '绳驱臂实时控制服务。', tags: ['Realtime'] },
        { name: 'SOMA × PUPPET', summary: 'SOMA IK / 接触 QP / 批量轨迹优化作为 PUPPET 插件接入。', tags: ['SOMA'] },
        { name: 'retarget-arena', summary: '重定向方法对比评测。', tags: ['Eval'] },
      ],
    },
    about: {
      title: '工程方式',
      intro: '遥操作与运控为主线，规划、求解与调试工具补齐交付。',
      steps: [
        { title: '运行时接入', body: '动捕、视觉与回放统一进 PUPPET，再下发到仿真或真机。' },
        { title: '跟踪训练与部署', body: 'GMT / teleop-rl：策略训练、sim2sim 到真机联调一条做完。' },
        { title: '规划与后处理', body: '轨迹投影、舵轮规划把可执行轨迹落到工程链路。' },
        { title: '全身控制', body: 'wbc-fsm 做状态调度与 Online QP 联调，覆盖实时动捕闭环。' },
      ],
      stackLabel: '常用技术',
      stackItems: [
        'C++',
        'Python',
        'PUPPET',
        'Online QP',
        'HQP / SQP',
        'MuJoCo',
        'Pinocchio',
        'CMake',
        'Conan',
      ],
    },
    contact: {
      title: '联系',
      body: '交流运控、遥操作、规划或机器人软件，欢迎通过 GitHub 联系。',
      github: 'GitHub',
    },
    footer: { note: 'Robot software & motion control.' },
  },
  en: {
    meta: {
      title: 'xyodfish · Robot Software & Motion Control',
      description:
        'Robot software and motion control: teleoperation, whole-body tracking, motion planning, and deployable control pipelines.',
    },
    nav: {
      work: 'Projects',
      demos: 'Clips',
      about: 'About',
      contact: 'Contact',
      langOther: '中文',
      langHref: '/',
    },
    hero: {
      role: 'Robotics Software / Motion-Control Engineer',
      lead: 'Teleop, whole-body tracking, planning, and WBC — software that reaches hardware.',
      support: 'Training, bring-up, and deploy as one path — not demos that stop at the lab.',
      ctaGithub: 'GitHub',
      ctaWork: 'See projects',
    },
    flow: {
      steps: ['Teleop / input', 'Tracking control', 'Motion planning', 'Deploy / hardware'],
    },
    work: {
      title: 'Projects',
      intro: 'Featured first: teleop runtime, tracking train-to-deploy, trajectory repair, and WBC.',
    },
    featured: [
      {
        name: 'PUPPET',
        role: 'Teleop runtime',
        summary:
          'Hard part: keep mocap / vision / replay time-aligned and still dispatch stably. I built the shared runtime and plugged in RealSense + MediaPipe vision teleop plus Online QP / SOMA as swappable solvers. Brought up on sim and hardware backends.',
        bullets: [],
        tags: ['Teleop', 'Vision', 'Runtime'],
        media: { src: '/media/vision-teleop.mp4', alt: 'PUPPET vision teleop' },
      },
      {
        name: 'GMT · teleop-rl',
        role: 'Whole-body tracking: train to deploy',
        summary:
          'Hard part: closing the sim2sim gap and generalizing across motion styles. I owned GMT training/eval and the teleop-rl deploy stack on G1 / H2 — walk–dance–mix, held-out, and field mocap bring-up — into a tracking path shared with teleop.',
        bullets: [],
        tags: ['GMT', 'teleop-rl', 'Training', 'Deploy'],
        media: { src: '/media/gmt-h2-multistyle.mp4', alt: 'GMT H2 multistyle tracking' },
      },
      {
        name: 'Trajectory Optimizer',
        role: 'Planning post-process',
        summary:
          'Planners often leave local collisions and constraint breaks that are unsafe to run. I built HQP whole-body projection plus SQP geometric repair: segment, check repairability, optimize locally, splice back. Shipped for arm / chassis multi-chain planning.',
        bullets: [],
        tags: ['HQP', 'SQP', 'Planning'],
        media: { src: '/media/hpn-traj.mp4', alt: 'HPN trajectory optimizer' },
      },
      {
        name: 'wbc-fsm',
        role: 'Whole-body control + FSM',
        summary:
          'Hard part: keep FSM switching and retarget solves on the same beat under live mocap. I implemented WBC × FSM with Noitom BVH and Online QP, plus side-by-side raw skeleton / H2 mesh bring-up. Lands as an online H2 pose loop.',
        bullets: [],
        tags: ['WBC', 'FSM', 'Noitom'],
        media: { src: '/media/noitom-h2-mesh.mp4', alt: 'H2 Online QP live mesh' },
      },
    ],
    systems: {
      title: 'More tools',
      intro: 'Solvers, chassis planning, kinematics debug, and a retargeting workbench.',
      items: [
        {
          name: 'Online QP',
          role: 'Streaming motion solve',
          summary: 'Short-horizon QP with contacts for continuous teleop and streaming replay.',
          bullets: [],
          tags: ['Online QP', 'qpOASES'],
          media: { src: '/media/online-qp-compare.mp4', alt: 'UMR vs GMR Online QP compare' },
        },
        {
          name: 'Chassis Planning',
          role: '4-steer Hybrid A*',
          summary: 'Hybrid A* + continuous optimization for independently steered bases.',
          bullets: [],
          tags: ['Hybrid A*', 'Chassis'],
          media: { src: '/media/chassis-plan.mp4', alt: 'Steering-wheel chassis planning' },
        },
        {
          name: 'PIVOT',
          role: 'Kinematics workbench',
          summary: 'Pose, IK, trajectories, and near-collision monitoring in one UI.',
          bullets: [],
          tags: ['Viewer', 'IK'],
          media: { src: '/media/pivot-kinematic.mp4', alt: 'PIVOT kinematic viewer' },
        },
        {
          name: 'MotionBridge',
          role: 'Retargeting WebUI',
          summary: 'Pick inputs and robots; run online / batch through the CLI and C++ backend.',
          bullets: [],
          tags: ['WebUI', 'Retarget'],
        },
      ],
    },
    demoGroups: [
      {
        label: 'PUPPET · Online QP',
        items: [
          { kind: 'video', src: '/media/vision-teleop.mp4', caption: 'Vision teleop' },
          { kind: 'video', src: '/media/online-qp-compare.mp4', caption: 'UMR vs GMR Online QP' },
          { kind: 'video', src: '/media/noitom-live-bvh.mp4', caption: 'Noitom BVH live skeleton' },
          { kind: 'video', src: '/media/noitom-h2-mesh.mp4', caption: 'H2 Online QP live mesh' },
        ],
      },
      {
        label: 'Planning & tools',
        items: [
          { kind: 'video', src: '/media/hpn-traj.mp4', caption: 'Trajectory opt' },
          { kind: 'video', src: '/media/chassis-plan.mp4', caption: 'Chassis planning' },
          { kind: 'video', src: '/media/pivot-kinematic.mp4', caption: 'PIVOT' },
        ],
      },
      {
        label: 'GMT · teleop-rl',
        items: [
          { kind: 'video', src: '/media/gmt-h2-multistyle.mp4', caption: 'H2 multistyle' },
          { kind: 'video', src: '/media/gmt-h2-field.mp4', caption: 'H2 field mocap' },
          { kind: 'video', src: '/media/gmt-h2-tracking.mp4', caption: 'H2 tracking vs ref' },
          { kind: 'video', src: '/media/gmt-g1-walk.mp4', caption: 'G1 walk' },
        ],
      },
    ],
    more: {
      title: 'Also',
      items: [
        { name: 'TENDRA', summary: 'Realtime control service for a tendon-driven arm.', tags: ['Realtime'] },
        { name: 'SOMA × PUPPET', summary: 'SOMA IK / contact QP / batch TO as PUPPET plugins.', tags: ['SOMA'] },
        { name: 'retarget-arena', summary: 'Comparative evaluation of retargeting methods.', tags: ['Eval'] },
      ],
    },
    about: {
      title: 'Approach',
      intro: 'Teleop and motion control as the main line; planning, solvers, and tools finish delivery.',
      steps: [
        { title: 'Runtime ingress', body: 'Unify mocap, vision, and replay in PUPPET, then dispatch to sim or hardware.' },
        { title: 'Train & deploy tracking', body: 'GMT / teleop-rl end-to-end: policy training, sim2sim, then robot bring-up.' },
        { title: 'Plan & post-process', body: 'Trajectory projection and chassis planning produce executable paths.' },
        { title: 'Whole-body control', body: 'wbc-fsm schedules tasks and brings up Online QP for live mocap loops.' },
      ],
      stackLabel: 'Stack',
      stackItems: [
        'C++',
        'Python',
        'PUPPET',
        'Online QP',
        'HQP / SQP',
        'MuJoCo',
        'Pinocchio',
        'CMake',
        'Conan',
      ],
    },
    contact: {
      title: 'Contact',
      body: 'Motion control, teleoperation, planning, or robot software — reach me on GitHub.',
      github: 'GitHub',
    },
    footer: { note: 'Robot software & motion control.' },
  },
};
