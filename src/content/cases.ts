import type { Locale } from './site';

export const caseSlugs = ['puppet', 'h2-motion-tracking', 'g1-motion-tracking', 'trajectory-repair'] as const;
export type CaseSlug = (typeof caseSlugs)[number];

type CaseMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  slug: CaseSlug;
  number: string;
  category: string;
  title: string;
  metaDescription: string;
  summary: string;
  heroMedia?: CaseMedia;
  facts: { value: string; label: string; note?: string }[];
  overview: string[];
  responsibility: string[];
  flow: string[];
  decisions: { title: string; body: string }[];
  evidence: { value: string; label: string; detail: string }[];
  limitations: string[];
  gallery: CaseMedia[];
};

export const caseStudies: Record<Locale, Record<CaseSlug, CaseStudy>> = {
  zh: {
    puppet: {
      slug: 'puppet',
      number: '01',
      category: '遥操作运行时',
      title: '让不同输入设备，共用一套遥操作流程。',
      metaDescription: 'PUPPET 将视觉、动捕和动作回放接入同一套遥操作流程，并支持替换机器人与动作重定向方法。',
      summary: '相机、动捕和录制动作各有不同的数据格式。PUPPET 把这些差异收在入口处，让后面的动作转换、仿真和控制可以自由组合。',
      heroMedia: {
        src: '/media/vision-teleop.mp4',
        alt: 'RealSense 与 MediaPipe 驱动 G1 右臂',
        caption: 'RealSense / MediaPipe → WBC arm IK → G1',
      },
      facts: [
        { value: 'G1 / H2', label: '机器人平台' },
        { value: '3 类', label: '视觉、动捕与回放输入' },
        { value: '1.77 ms', label: 'C++ 重定向平均耗时', note: 'Release，150 帧测试' },
        { value: '2.33 ms', label: '95% 帧内耗时', note: '同一测试条件' },
      ],
      overview: [
        '遥操作系统常被设备格式、人体骨架、机器人关节顺序和通信方式绑在一起。PUPPET 在它们之间加了一层稳定的动作表达：输入端只描述人体做了什么，后续模块再决定如何把动作变成具体机器人的目标。',
        '因此 RealSense、Noitom 和文件回放可以使用同一条处理链；GMR、SOMA、UMR 或直接逆运动学也能按任务替换。仿真、可视化和控制服务不需要分别理解每一种设备。',
      ],
      responsibility: [
        '设计人体动作输入与机器人目标之间的统一数据边界，并完成整条运行时。',
        '接入 RealSense / MediaPipe、Noitom 动捕和文件回放，处理不同身体部位的输入选择。',
        '把 GMR、SOMA、UMR 和逆运动学接入同一套可替换流程，并提供 C++ 实时路径。',
        '统一配置、启动、通信和日志，让不同机器人与算法组合可以复现和排查。',
      ],
      flow: ['视觉 / 动捕 / 回放', '统一人体动作', '选择身体输入', '动作重定向', '机器人目标', '仿真 / 控制'],
      decisions: [
        {
          title: '先统一动作含义，再适配机器人',
          body: '输入端只描述人体或操作端动作；机器人关节顺序、逆运动学和接触约束留给后面的动作转换。',
        },
        {
          title: '实时链路不依赖临时进程',
          body: '需要低延迟的重定向直接在 C++ 进程内运行，避免每帧跨语言、启动子进程或额外传输。',
        },
        {
          title: '通信方式不改变控制逻辑',
          body: '内部动作语义保持一致，外部通信只负责传输。更换中间件时，不需要修改重定向与控制模块。',
        },
      ],
      evidence: [
        {
          value: '1.77 ms mean',
          label: 'C++ 实时重定向',
          detail: '150 帧 jumping-jack、Release 构建；95% 的帧在 2.33 ms 内完成。',
        },
        {
          value: '50.78 ms mean',
          label: '此前 Python 实现',
          detail: '作为同一方法迁移前的性能参照；两条实现的输出接近，但不是逐元素完全相同。',
        },
        {
          value: '0.0477 rad',
          label: 'H2 关节轨迹差异',
          detail: 'C++ 结果相对此前 Python 在线版本的均方根差异；根部平移差异为 0.0105 m。',
        },
      ],
      limitations: [
        'UMR C++ 与此前 Python 路径保持接近但并非逐元素完全一致，性能与轨迹差异应一起阅读。',
        '页面中的视频主要证明输入、重定向和仿真链路，不自动等同于真机稳定性。',
        '设备支持、求解器支持和机器人支持是可组合能力，不表示所有组合都已完成同等程度验证。',
      ],
      gallery: [
        { src: '/media/noitom-h2-mesh.mp4', alt: 'Noitom BVH 到 H2 mesh', caption: 'Noitom BVH → H2 online retargeting' },
        { src: '/media/online-qp-compare.mp4', alt: 'UMR 与 GMR Online QP 对比', caption: 'SMPL-X / UMR / GMR Online QP' },
        { src: '/media/soma-banner.mp4', alt: 'SOMA 重定向', caption: 'SOMA in-process retargeting' },
      ],
    },
    'h2-motion-tracking': {
      slug: 'h2-motion-tracking',
      number: '02',
      category: '训练与全身跟踪',
      title: '让 H2 学会跟随多种人体动作。',
      metaDescription: 'H2 全身动作跟踪：从动作数据、训练任务和奖励设计，到 31 关节策略训练、系统评测与 C++ 部署验证。',
      summary: '这个项目的主体不是把现成模型接进控制器，而是从动作数据开始，设计并训练一套能在 50 Hz 下跟随全身参考的 H2 策略，再用独立运行时验证训练结果。',
      heroMedia: {
        src: '/media/gmt-h2-multistyle.mp4',
        alt: 'H2 多风格全身跟踪',
        caption: 'H2 policy rollout / purple reference',
      },
      facts: [
        { value: '2,810', label: '训练动作' },
        { value: '31', label: '全身控制关节' },
        { value: '50 Hz', label: '策略控制频率' },
        { value: '31 cases', label: '广覆盖固定评测' },
      ],
      overview: [
        '训练数据由 2,492 条已有动作与 318 条现场动捕动作组成，统一重定向到 H2 的 31 个关节。策略不仅要复现姿态，还要同时处理行走、转身、跳跃、上肢动作和随机时间点接入。',
        '训练任务只给策略真实系统可获得的惯性、关节和历史动作信息，并加入当前及未来的动作参考。身体各部分、脚部、根部运动与平滑性分别设置目标，再通过困难动作采样和失败片段回放，把训练资源集中到容易失稳的位置。',
      ],
      responsibility: [
        '完成 H2 动作数据的重定向、筛选、混合与 50 Hz 训练集构建。',
        '设计 31 关节训练任务，包括可部署的输入历史、参考动作表达、动作输出与分身体区域奖励。',
        '设计按动作类型均衡、按跟踪误差加权和失败片段回放的采样策略，并继续加入停帧与扰动恢复训练。',
        '从零训练多个版本，用固定动作、随机起点、状态扰动和多随机种子测试选择权重，而不是默认采用最后一个检查点。',
        '导出策略并接入 wbc_fsm，以 C++ / MuJoCo 回放检查观测、关节顺序和在线时序；这一步是部署验证，不是项目的全部。',
      ],
      flow: ['人体动作数据', 'H2 动作重定向', '训练任务设计', '强化学习训练', '固定与扰动评测', 'C++ 部署验证'],
      decisions: [
        {
          title: '训练时只使用运行时可获得的信息',
          body: '策略输入来自惯性、关节状态、历史动作与动作参考；仿真中的完整根状态只供训练评估使用，不直接喂给最终策略。',
        },
        {
          title: '困难动作获得更多训练机会',
          body: '采样同时考虑动作类别与近期跟踪误差，并回到失败前的片段继续训练，避免简单动作长期占据大部分样本。',
        },
        {
          title: '最佳权重不等于最后权重',
          body: '最终选择比较姿态、脚部、根部轨迹、完成率与扰动恢复。187.5k 在整体运动推进和根部跟踪上优于 200k，因此被选为默认版本。',
        },
      ],
      evidence: [
        {
          value: '0.0477 rad',
          label: '固定动作关节误差',
          detail: '最终默认权重在 15 条固定动作上的全身关节均方根误差，15/15 全部完成。',
        },
        {
          value: '45 / 45',
          label: '扰动与随机起点测试',
          detail: '15 条动作 × 3 个随机种子，在随机起点和初始状态扰动下全部完成。',
        },
        {
          value: '29 / 31',
          label: '广覆盖动作完成',
          detail: '覆盖后退、侧向、转身、行走、上肢和跳跃；两项未通过的是跟踪门限，不应写成全部成功。',
        },
      ],
      limitations: [
        '当前量化结果来自 MuJoCo 训练、仿真与 sim2sim，不能替代真实机器人安全验证。',
        '31 条广覆盖动作中，punchboxing kick 未通过倾斜门限，crouchwalk stand 未通过持续高度跟踪门限。',
        'C++ 回放证明训练与运行时接口能够对齐；它不单独证明策略对所有初始化误差和物理差异都稳健。',
      ],
      gallery: [
        { src: '/media/gmt-h2-tracking.mp4', alt: 'H2 策略与参考对比', caption: 'Policy tracking vs reference' },
        { src: '/media/gmt-h2-field.mp4', alt: '外场动捕参考在 H2 仿真中回放', caption: 'Recorded field mocap → simulated H2' },
        { src: '/media/wbc-mocap.mp4', alt: '动捕参考与 H2 跟踪', caption: 'Mocap reference / H2 tracking' },
      ],
    },
    'g1-motion-tracking': {
      slug: 'g1-motion-tracking',
      number: '03',
      category: '训练、评测与全身跟踪',
      title: '让一个策略覆盖行走、转身与全身动作。',
      metaDescription: 'G1 全身动作跟踪：从 2,730 条动作的数据审计、因果时序策略与奖励设计，到固定训练外测试和安全优先的权重选择。',
      summary: '这不是挑一个演示动作训到能跑，而是把 2,730 条动作放进同一个训练任务，再用独立动作集检查姿态、移动、接触和稳定性是否真的同时成立。',
      heroMedia: {
        src: '/media/gmt-g1-mix.mp4',
        alt: 'G1 策略跟随多种全身动作参考',
        caption: 'G1 policy rollout / purple reference',
      },
      facts: [
        { value: '2,730', label: '统一训练动作' },
        { value: '29', label: '全身控制关节' },
        { value: '50 Hz', label: '策略控制频率' },
        { value: '20', label: '固定训练外动作' },
      ],
      overview: [
        '动作先经过重定向、清洗和统一采样，再按关节、根部运动、手脚位置与接触信息组成 50 Hz 训练数据。训练集覆盖站立、行走、转向、后退、上肢和动态动作，目的是让一套策略处理不同运动，而不是为每个片段单独调参。',
        '策略用过去 10 帧状态理解动作趋势，同时跟踪身体姿态、根部路径、手脚位置和接触节奏。训练之外保留 20 条固定动作，用同一套回放条件比较不同奖励与不同训练轮次，避免只凭一段顺眼的视频选模型。',
      ],
      responsibility: [
        '构建并审计 G1 动作库，检查坐标、速度、接触、关节范围和循环边界，让数据问题在训练前可见。',
        '设计 29 关节因果时序策略、可运行时获得的输入，以及姿态、根部、手脚、接触与平滑性目标。',
        '在 4,096 个并行环境中训练多个版本，并围绕脚滑、落地时序和高速动作逐轮调整奖励。',
        '建立固定训练外动作评测，按动作族检查姿态误差、移动方向、根部轨迹、脚滑、接触和失稳。',
        '综合量化结果和逐段回放选择默认权重；当最终轮次的腿部安全退化时，不把它自动当成最佳模型。',
      ],
      flow: ['人体动作数据', 'G1 动作重定向', '数据质量审计', '因果策略训练', '固定训练外评测', '安全优先选权重'],
      decisions: [
        {
          title: '用时间历史理解动作趋势',
          body: '策略读取过去 10 帧机器人状态，在不依赖未来机器人状态的前提下区分快慢、转向与接触变化，并保持适合实时运行的因果结构。',
        },
        {
          title: '评测行为，而不只比较姿态',
          body: '关节更像并不代表走得更对。评测同时检查移动方向、根部路径、手脚位置、脚滑、接触时刻和是否失稳。',
        },
        {
          title: '安全表现优先于最后一轮',
          body: '后期模型的平均姿态误差可能继续下降，但转身脚滑和倾斜也可能变差，因此默认权重按综合行为选择。',
        },
      ],
      evidence: [
        {
          value: '2,730 motions',
          label: '单一策略训练',
          detail: '同一训练任务覆盖常规站立、行走、部分后退与转向，以及多种全身姿态，不为演示片段单独训练。',
        },
        {
          value: '20 held-out',
          label: '固定训练外动作',
          detail: '每个候选权重都在相同动作、相同起点和相同指标下单遍评测，结果不混入训练动作。',
        },
        {
          value: '90k ≠ last',
          label: '安全优先选权重',
          detail: '训练终点在部分平均误差上更好，但转身的脚滑、倾斜与纠偏步回退，因此保留 90k 作为该阶段主权重。',
        },
      ],
      limitations: [
        '当前证据主要来自 MuJoCo 训练与仿真回放，不能替代真实机器人上的安全验证。',
        '高速运动、跳跃落地和支撑脚防滑仍是明确短板；页面不把动作外形相似写成动力学完成。',
        '固定训练外测试来自单个训练随机种子和 20 条动作，足以比较本轮候选，但不能证明对全部动作全局最优。',
      ],
      gallery: [
        { src: '/media/gmt-g1-heldout.mp4', alt: 'G1 固定动作评测回放', caption: 'Fixed-suite checkpoint review' },
        { src: '/media/gmt-g1-walk.mp4', alt: 'G1 行走跟踪', caption: 'Locomotion tracking' },
        { src: '/media/gmt-g1-dance.mp4', alt: 'G1 上肢与舞蹈动作跟踪', caption: 'Upper-body / dance motion' },
      ],
    },
    'trajectory-repair': {
      slug: 'trajectory-repair',
      number: '04',
      category: '规划后处理',
      title: '只修发生碰撞的那一段。',
      metaDescription: '在保留原规划结构的前提下修复局部碰撞，并重新检查碰撞、终点误差与执行速度。',
      summary: '当一条规划轨迹大部分都可用时，没有必要全部推倒重来。这个项目先找出问题区间，只调整必要的部分，并对修改后的轨迹重新验收。',
      heroMedia: {
        src: '/media/hpn-traj.mp4',
        alt: '机器人规划轨迹局部碰撞修复',
        caption: 'Reference path → local HQP projection',
      },
      facts: [
        { value: '局部', label: '只处理碰撞窗口' },
        { value: '4 项', label: '修复前判断条件' },
        { value: '稠密检查', label: '修复后碰撞复核' },
        { value: 'x86 / arm64', label: '支持平台' },
      ],
      overview: [
        '系统先沿已有轨迹检测碰撞，裁出包含前后缓冲的局部窗口，并检查问题是否适合修复：窗口不能几乎全被碰撞占满，也不能在目标点附近没有调整空间。',
        '通过判断后，分层约束求解器在尽量贴近原轨迹的前提下把碰撞点推出障碍物。之后还要重新检查整段连续路径、目标点误差和速度限制；任何一步失败，都保留明确原因。',
      ],
      responsibility: [
        '完成从碰撞检测、可修复性判断、局部投影到执行速度生成的整条流程。',
        '把碰撞区间占比、前后缓冲、碰撞密度和目标点接触转成清晰的拒绝条件。',
        '处理重复轨迹点、路径加密和时间参数化，并在每次改变几何路径后重新检查碰撞。',
        '保存五个阶段的中间结果，让失败可以回放，也能定位问题在哪一步产生。',
      ],
      flow: ['已有规划轨迹', '定位碰撞区间', '判断是否适合修复', '局部约束调整', '连续路径复核', '生成执行速度'],
      decisions: [
        {
          title: '先判断局部修复是否合适',
          body: '碰撞过长、前后缓冲不足或问题紧贴目标点时，局部调整可能破坏任务；此时明确拒绝比盲目增加迭代更可靠。',
        },
        {
          title: '保留原轨迹的关键点',
          body: '补点与平滑不能抹掉规划器为避障留下的关键位置，因此以保留原始路点为前提增加采样密度。',
        },
        {
          title: '每次改变路径后都重新验收',
          body: '去重、补点、捷径和平滑都会改变点与点之间的连续路径，不能沿用修改前的碰撞结论。',
        },
      ],
      evidence: [
        {
          value: '5 variants',
          label: '可回放处理阶段',
          detail: '原始、局部调整、预处理和两种速度结果分开保存，能定位轨迹在哪一步发生变化。',
        },
        {
          value: '4 gates',
          label: '修复前判断条件',
          detail: '局部窗口比例、前导缓冲、尾部缓冲与碰撞密度共同决定是否继续。',
        },
        {
          value: 'Fixed path',
          label: '速度生成的边界',
          detail: '时间参数化只决定怎样按速度限制走完路径，不负责避障；输入路径必须先通过碰撞检查。',
        },
      ],
      limitations: [
        '该方法面向局部碰撞和擦碰，不替代全局重新规划。',
        '当前部分严重程度指标来自采样点密度，不能当作精确的几何穿透深度。',
        '平滑或备用方案只有在重新验收后才可接受；程序成功返回不自动等于轨迹可执行。',
      ],
      gallery: [],
    },
  },
  en: {
    puppet: {
      slug: 'puppet',
      number: '01',
      category: 'Teleoperation runtime',
      title: 'One teleoperation flow for different input devices.',
      metaDescription: 'PUPPET brings vision, mocap, and recorded motion into one teleoperation flow with replaceable robots and retargeting methods.',
      summary: 'Cameras, mocap systems, and recorded motion all speak different formats. PUPPET absorbs those differences at the input so retargeting, simulation, and control can be combined freely.',
      heroMedia: {
        src: '/media/vision-teleop.mp4',
        alt: 'RealSense and MediaPipe driving a G1 right arm',
        caption: 'RealSense / MediaPipe → WBC arm IK → G1',
      },
      facts: [
        { value: 'G1 / H2', label: 'Robot platforms' },
        { value: '3 types', label: 'Vision, mocap & replay inputs' },
        { value: '1.77 ms', label: 'Mean C++ retarget time', note: 'Release, 150-frame test' },
        { value: '2.33 ms', label: '95th-percentile frame', note: 'Same test condition' },
      ],
      overview: [
        'Teleoperation systems are often tied together by device formats, human skeletons, robot joint order, and transport. PUPPET inserts one stable motion representation: inputs describe what the operator did, while later stages decide how a specific robot should execute it.',
        'RealSense, Noitom, and replay can therefore share one path. GMR, SOMA, UMR, or direct inverse kinematics can be selected per task, without teaching simulation and control about every device.',
      ],
      responsibility: [
        'Designed the common boundary between human-motion inputs and robot targets, then implemented the runtime around it.',
        'Integrated RealSense / MediaPipe, Noitom mocap, and recorded motion, including body-part source selection.',
        'Brought GMR, SOMA, UMR, and inverse kinematics into one replaceable flow, including a realtime C++ path.',
        'Unified configuration, launch, communication, and logging so robot / method combinations are reproducible.',
      ],
      flow: ['Vision / mocap / replay', 'Common human motion', 'Body-source selection', 'Motion retargeting', 'Robot target', 'Simulation / control'],
      decisions: [
        { title: 'Standardize motion before adapting the robot', body: 'Inputs describe operator motion; joint order, inverse kinematics, and contact constraints remain in the later conversion stage.' },
        { title: 'Realtime work stays in process', body: 'Low-latency retargeting runs directly in C++, avoiding per-frame language crossings, subprocesses, or extra transport.' },
        { title: 'Transport does not change control logic', body: 'Internal motion semantics stay fixed while external communication only moves the data.' },
      ],
      evidence: [
        { value: '1.77 ms mean', label: 'Realtime C++ retargeting', detail: '150-frame jumping-jack in Release; 95% of frames completed within 2.33 ms.' },
        { value: '50.78 ms mean', label: 'Earlier Python implementation', detail: 'A performance reference for the port; outputs are close but not element-wise identical.' },
        { value: '0.0477 rad', label: 'H2 joint-trajectory difference', detail: 'C++ output against the earlier Python online result; root-translation difference was 0.0105 m.' },
      ],
      limitations: [
        'The C++ UMR path is close to, but not element-wise identical to, the earlier Python path; speed and trajectory differences belong together.',
        'The videos primarily establish input, retargeting, and simulation behavior; they do not imply hardware stability.',
        'Supported devices, solvers, and robots are composable capabilities, not proof that every combination has equal validation depth.',
      ],
      gallery: [
        { src: '/media/noitom-h2-mesh.mp4', alt: 'Noitom BVH to H2 mesh', caption: 'Noitom BVH → H2 online retargeting' },
        { src: '/media/online-qp-compare.mp4', alt: 'UMR and GMR Online QP comparison', caption: 'SMPL-X / UMR / GMR Online QP' },
        { src: '/media/soma-banner.mp4', alt: 'SOMA retargeting', caption: 'SOMA in-process retargeting' },
      ],
    },
    'h2-motion-tracking': {
      slug: 'h2-motion-tracking',
      number: '02',
      category: 'Training & whole-body tracking',
      title: 'Teaching H2 to follow diverse human motion.',
      metaDescription: 'H2 whole-body tracking from motion data, task and reward design through 31-joint policy training, evaluation, and C++ deployment validation.',
      summary: 'The core work was not wiring an existing model into a controller. It began with motion data and produced a 50 Hz H2 tracker through task design, training, and systematic evaluation, followed by independent runtime validation.',
      heroMedia: {
        src: '/media/gmt-h2-multistyle.mp4',
        alt: 'H2 multi-style whole-body tracking',
        caption: 'H2 policy rollout / purple reference',
      },
      facts: [
        { value: '2,810', label: 'Training motions' },
        { value: '31', label: 'Whole-body joints' },
        { value: '50 Hz', label: 'Policy control rate' },
        { value: '31 cases', label: 'Broad fixed evaluation' },
      ],
      overview: [
        'The training set combines 2,492 existing motions with 318 field-mocap recordings, all retargeted to H2’s 31 joints at 50 Hz. The policy must cover walking, turning, jumping, upper-body motion, and entry from arbitrary points in a clip.',
        'The task exposes only signals available to the real system—IMU, joint state, action history, and motion references. Separate objectives shape each body region, feet, root motion, and smoothness, while hard-motion scheduling and failure replay focus training on unstable segments.',
      ],
      responsibility: [
        'Retargeted, filtered, mixed, and packaged the H2 motion data as a 50 Hz training set.',
        'Designed the 31-joint task: deployable observation history, reference representation, actions, and body-group tracking objectives.',
        'Designed family-balanced, error-weighted, and failure-replay sampling, then extended training with stop and recovery disturbances.',
        'Trained multiple variants from scratch and selected checkpoints with fixed motions, random starts, state perturbations, and multiple seeds—not simply the latest checkpoint.',
        'Exported the trained policy into wbc_fsm for C++ / MuJoCo checks of observations, joint order, and timing; this was deployment validation, not the whole project.',
      ],
      flow: ['Human motion data', 'H2 retargeting', 'Training-task design', 'Reinforcement learning', 'Fixed & perturbed tests', 'C++ deployment check'],
      decisions: [
        { title: 'Train on signals the runtime can actually provide', body: 'The policy uses IMU, joint state, action history, and references. Full simulated root state is reserved for training diagnostics, not fed directly to the deployed policy.' },
        { title: 'Give difficult motion more training time', body: 'Sampling accounts for both motion families and recent tracking error, then revisits segments before failures so easy clips do not dominate the run.' },
        { title: 'The best checkpoint is not the last checkpoint', body: 'Selection balances pose, feet, root trajectory, completion, and robustness. The 187.5k checkpoint beat the 200k endpoint on the overall deployment objective.' },
      ],
      evidence: [
        { value: '0.0477 rad', label: 'Fixed-suite joint error', detail: 'Whole-body joint RMSE for the selected checkpoint across 15 fixed motions, with 15/15 completed.' },
        { value: '45 / 45', label: 'Perturbed random-start tests', detail: '15 motions × 3 seeds completed under random starts and initial-state perturbations.' },
        { value: '29 / 31', label: 'Broad motion completion', detail: 'Backward, sideways, turning, walking, upper-body, and jumping cases; two missed tracking gates are reported rather than hidden.' },
      ],
      limitations: [
        'Current quantitative results come from MuJoCo training, simulation, and sim2sim; they do not replace real-robot safety validation.',
        'Of the broad 31 cases, punchboxing kick missed the tilt gate and crouchwalk stand missed the sustained height-tracking gate.',
        'C++ replay verifies alignment between training and runtime; it does not by itself prove robustness to every initialization or physics mismatch.',
      ],
      gallery: [
        { src: '/media/gmt-h2-tracking.mp4', alt: 'H2 policy and reference comparison', caption: 'Policy tracking vs reference' },
        { src: '/media/gmt-h2-field.mp4', alt: 'Field mocap reference replayed on simulated H2', caption: 'Recorded field mocap → simulated H2' },
        { src: '/media/wbc-mocap.mp4', alt: 'Mocap reference and H2 tracking', caption: 'Mocap reference / H2 tracking' },
      ],
    },
    'g1-motion-tracking': {
      slug: 'g1-motion-tracking',
      number: '03',
      category: 'Training, evaluation & tracking',
      title: 'One policy for walking, turning, and whole-body motion.',
      metaDescription: 'G1 whole-body tracking from auditing 2,730 motions and designing a causal temporal policy to held-out evaluation and safety-first checkpoint selection.',
      summary: 'Rather than train one polished demo, this project puts 2,730 motions into a single task and uses a separate motion suite to test whether pose, movement, contact, and stability hold together.',
      heroMedia: {
        src: '/media/gmt-g1-mix.mp4',
        alt: 'G1 policy following varied whole-body motion references',
        caption: 'G1 policy rollout / purple reference',
      },
      facts: [
        { value: '2,730', label: 'Motions in one training set' },
        { value: '29', label: 'Whole-body joints' },
        { value: '50 Hz', label: 'Policy control rate' },
        { value: '20', label: 'Fixed held-out motions' },
      ],
      overview: [
        'Motion is retargeted, cleaned, and resampled before joint, root, hand / foot, and contact signals become a 50 Hz training set. Standing, walking, turning, backward motion, upper-body movement, and dynamic clips share one policy instead of being tuned as separate demos.',
        'A causal policy reads ten frames of state history while tracking pose, root path, hand / foot position, and contact rhythm. Twenty fixed held-out motions then compare reward variants and training checkpoints under the same playback conditions, rather than selecting a model from one attractive video.',
      ],
      responsibility: [
        'Built and audited the G1 motion library, checking frames, velocities, contacts, joint ranges, and loop boundaries before training.',
        'Designed the 29-joint causal temporal policy, runtime-available inputs, and objectives for pose, root motion, hands, feet, contact, and smoothness.',
        'Trained several variants across 4,096 parallel environments, iterating on foot slip, landing timing, and high-speed motion.',
        'Built a fixed held-out evaluation that measures pose error, travel direction, root path, foot slip, contact, and instability by motion family.',
        'Selected the default checkpoint from metrics and clip-level replay; the final iteration was rejected when leg safety regressed.',
      ],
      flow: ['Human motion', 'G1 retargeting', 'Data-quality audit', 'Causal policy training', 'Fixed held-out suite', 'Safety-first selection'],
      decisions: [
        {
          title: 'Use state history to read motion trend',
          body: 'Ten past frames help distinguish speed, turns, and contact changes without future robot state, while retaining a causal structure suitable for realtime execution.',
        },
        {
          title: 'Evaluate behavior, not pose alone',
          body: 'A lower joint error does not guarantee correct travel. The suite also measures direction, root path, hand / foot position, slip, contact timing, and instability.',
        },
        {
          title: 'Prefer safe behavior to the last iteration',
          body: 'Later training improved some average pose metrics but could worsen turning slip and tilt, so checkpoint selection balances the complete behavior.',
        },
      ],
      evidence: [
        {
          value: '2,730 motions',
          label: 'One-policy training',
          detail: 'A single task covers ordinary standing and walking, some backward and turning motion, and varied whole-body poses—not a policy trained for one showcase clip.',
        },
        {
          value: '20 held-out',
          label: 'Fixed unseen suite',
          detail: 'Every candidate is replayed once with the same motions, start conditions, and metrics, without folding these clips into training.',
        },
        {
          value: '90k ≠ last',
          label: 'Safety-first checkpoint',
          detail: 'The endpoint improved some averages but regressed turning slip, tilt, and corrective stepping, so 90k remained the stage default.',
        },
      ],
      limitations: [
        'Current evidence is primarily MuJoCo training and simulation replay; it is not a substitute for hardware safety validation.',
        'Fast motion, jump landing, and stance-foot slip remain explicit weaknesses; visual resemblance is not reported as dynamic completion.',
        'The fixed suite uses one training seed and 20 held-out motions. It supports checkpoint comparison, not global optimality across every motion.',
      ],
      gallery: [
        { src: '/media/gmt-g1-heldout.mp4', alt: 'G1 fixed-suite motion review', caption: 'Fixed-suite checkpoint review' },
        { src: '/media/gmt-g1-walk.mp4', alt: 'G1 locomotion tracking', caption: 'Locomotion tracking' },
        { src: '/media/gmt-g1-dance.mp4', alt: 'G1 upper-body and dance tracking', caption: 'Upper-body / dance motion' },
      ],
    },
    'trajectory-repair': {
      slug: 'trajectory-repair',
      number: '04',
      category: 'Planning post-process',
      title: 'Repair only the part that collides.',
      metaDescription: 'Repair local collisions while preserving the original plan, then recheck collision, goal error, and execution timing.',
      summary: 'When most of a planned trajectory is already useful, replacing all of it is unnecessary. This project finds the problematic interval, adjusts only what is needed, and validates the result again.',
      heroMedia: {
        src: '/media/hpn-traj.mp4',
        alt: 'Local collision repair for a robot trajectory',
        caption: 'Reference path → local HQP projection',
      },
      facts: [
        { value: 'Local', label: 'Collision-window scope' },
        { value: '4 signals', label: 'Pre-repair decision' },
        { value: 'Dense check', label: 'Post-repair collision test' },
        { value: 'x86 / arm64', label: 'Target platforms' },
      ],
      overview: [
        'The system scans an existing trajectory for collision, extracts a local window with room on both sides, and first asks whether repair is appropriate. A window that is almost entirely blocked, or a collision at the goal, needs a different solution.',
        'When repair is appropriate, a constrained solver moves the path out of collision while staying close to the original. The continuous path, goal error, and speed limits are then checked again, with explicit reasons retained for every rejection.',
      ],
      responsibility: [
        'Built the full path from collision detection and repair decisions through local adjustment and executable timing.',
        'Converted window occupancy, front / rear buffer, collision density, and goal contact into clear rejection conditions.',
        'Handled duplicate points, densification, and timing, with a new collision check after every geometric change.',
        'Saved five intermediate stages so failures can be replayed and traced to the stage that introduced them.',
      ],
      flow: ['Existing trajectory', 'Locate collision', 'Decide if repair fits', 'Local constrained edit', 'Continuous-path check', 'Generate timing'],
      decisions: [
        { title: 'First decide whether local repair fits', body: 'Long collisions, insufficient buffers, or collision at the goal are more likely to damage the task than benefit from extra iterations.' },
        { title: 'Preserve important points from the plan', body: 'Densification and smoothing must not erase waypoints that the planner deliberately kept for obstacle avoidance.' },
        { title: 'Revalidate after every path change', body: 'Deduplication, densification, shortcutting, and smoothing all change the continuous path between samples.' },
      ],
      evidence: [
        { value: '5 stages', label: 'Replayable intermediates', detail: 'Original, locally adjusted, preprocessed, and two timed results isolate where a path changed.' },
        { value: '4 signals', label: 'Pre-repair decision', detail: 'Window ratio, front buffer, rear buffer, and collision density determine whether local adjustment runs.' },
        { value: 'Fixed path', label: 'Timing boundary', detail: 'Time parameterization decides how fast to traverse a path; it does not avoid obstacles, so geometry must already be collision-free.' },
      ],
      limitations: [
        'The method targets local collision and grazing; it does not replace global replanning.',
        'Part of the current severity signal comes from sample density, not exact geometric penetration depth.',
        'Smoothing or alternate timing is acceptable only after revalidation; a successful return alone is not execution evidence.',
      ],
      gallery: [],
    },
  },
};

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  if (!caseSlugs.includes(slug as CaseSlug)) {
    return undefined;
  }

  return caseStudies[locale][slug as CaseSlug];
}
