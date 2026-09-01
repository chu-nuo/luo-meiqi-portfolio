const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  name: '罗美琪',
  role: 'AI 产品经理 / 产品经理',
  direction: 'AI 产品、0-1 与业务落地',
  city: '杭州',

  email: '2877728911@qq.com',
  positioning: '把复杂业务拆成清晰机制，用 PRD、原型、数据与协作推动产品落地。',
  proof: [
    { value: '4 类', label: '首发智能体角色' },
    { value: '3 周', label: '独立完成 AI MVP' },
    { value: '200+', label: '团建调研样本记录' },
    { value: '3 轮', label: '线下产品迭代记录' },
  ],
}

export const projects = [
  {
    slug: 'yijiajia',
    title: '易佳佳 AI 门店助手',
    subtitle: '从单一问答入口，走向多智能体协作与人工兜底闭环',
    kind: 'AI 产品机制与 B 端流程',
    role: '产品经理实习生',
    time: '2026.06 - 至今',
    company: '杭州易启未来智能科技有限公司',
    tags: ['AI Agent', 'RAG', 'AI-Human', 'PRD 与原型'],
    lead: '服务门店销售、产品咨询与售后排障，把分散知识、专家能力和人工服务重新组织成一条可持续迭代的工作流。',
    background: '门店 FAQ、培训资料与产品手册分散，单一问答入口难以覆盖销售陪练、产品咨询和售后排障。AI 无法解决时，也缺少明确的转人工与知识回流路径。',
    problem: [
      '如何保持统一入口，同时让不同专家只处理擅长的任务。',
      '如何治理手册、FAQ 与 SOP，让知识可检索、可维护、可追踪。',
      'AI 无法解决时，如何转人工并把人工答案沉淀为可复用知识。',
      '如何在规划功能、测试功能与已上线能力之间保持清晰边界。',
    ],
    responsibilities: [
      '参与 Agent 2.0 与 Workflow 混合架构、专家边界和路由机制设计。',
      '负责 System Prompt、知识分层、Markdown 清洗与合规词替换规范。',
      '独立负责 Pad 消息中心与后台配置方案，推进研发、测试、UI 联调和验收。',
      '输出沉浸模式遥控组件与理疗后分享页体验改版方案。',
    ],
    solution: [
      { label: '先分清任务边界', text: '主智能体负责识别意图，首发专家覆盖销售、产品与售后。经营参谋、体质顾问等能力只作为规划方向。' },
      { label: '再治理知识来源', text: '按业务层级拆分知识库，补充 YAML 标签、Markdown 清洗、合规红线与分身检索范围。' },
      { label: '最后补人工闭环', text: 'AI 未解决后创建工单，人工回复回传用户，并把有效答案补充进知识库。' },
      { label: '用状态定义体验', text: '明确消息未读、人工回复可见性、工单处理与回归验证，避免只画理想流程。' },
    ],
    outputs: [
      '多智能体产品方案、PRD 与交互原型',
      '知识分层、清洗、标签与合规治理规范',
      'Pad 消息中心和后台配置状态链路',
      '专家典型场景问答手册与演示话术',
    ],
    result: '消息中心方案已完成测试。自助解决率、知识准确率、工单下降等数字属于目标口径，暂不作为已实现结果。',
    reflection: [
      'AI 产品的关键不是增加更多专家，而是明确每个角色的任务边界、知识范围和失败兜底。',
      '下一步需要用脱敏埋点与评测集验证路由准确率、知识命中率和人工闭环效率。',
    ],
    evidence: [
      { status: 'verified', text: 'PRD 与问答手册明确了首发角色、知识治理和 AI-Human 闭环' },
      { status: 'recorded', text: '简历记录：消息中心已完成测试' },
      { status: 'pending', text: '待补充：脱敏 PRD 页面、评测结果与上线效果数据' },
    ],
    flow: ['业务提问', '主智能体识别', '专家处理', '无解转工单', '人工回复', '知识回流'],
    visuals: [
      {
        src: assetPath('projects/yijiajia/current-expert-home.png'),
        alt: '易佳佳当前版本的多智能体入口界面',
        caption: '当前版本智能体入口，展示角色选择、建议问题与语音入口。画面不含门店或顾客数据，最终呈现以实际版本为准。',
      },
    ],
  },
  {
    slug: 'ai-english',
    title: 'AI 英语学习平台',
    subtitle: '从学习目标出发，3 周完成个性化任务产品 MVP',
    kind: '0-1 产品与独立开发',
    role: '独立开发者',
    time: '2025.12 - 2026.03',
    company: '个人项目',
    tags: ['0-1', 'Next.js', 'OpenAI API', '指标设计'],
    lead: '把用户水平、目标分数与可用时间转化为每日学习任务，并用完成率、学习时长和连续学习天数形成反馈闭环。',
    background: '统一的学习内容难以同时适配不同基础、目标和可用时间。这个项目验证 AI 个性化生成能否成为每日学习任务的核心能力。',
    problem: [
      '如何把模糊目标拆成每天可执行的听力、阅读和词汇任务。',
      '如何让生成内容保持难度分级与路径连续性。',
      '如何在短周期内完成产品定义、技术选型和可演示 MVP。',
    ],
    responsibilities: [
      '独立完成需求分析、核心流程、产品指标与技术选型。',
      '使用 Next.js、React 与 OpenAI API 开发用户、任务生成和统计模块。',
      '设计学习时长、任务完成率与连续学习天数等核心指标。',
    ],
    solution: [
      { label: '把输入变成约束', text: '以用户水平、目标分数和可用时间作为任务生成的基础条件。' },
      { label: '把目标拆成任务', text: '按听力、阅读与词汇拆分每日任务，并预留难度调整机制。' },
      { label: '把行为变成反馈', text: '记录完成率、学习时长和连续学习天数，为路径调整提供依据。' },
      { label: '先验证核心闭环', text: '优先完成注册、任务生成和统计，不在 MVP 阶段扩张非核心功能。' },
    ],
    outputs: ['用户与登录模块', 'AI 个性化任务生成模块', '学习数据统计模块', '可访问的在线 MVP'],
    result: '公开登录页已部署，可在桌面与移动端访问，当前检查未发现控制台错误。登录后的学习流程尚未提供公开测试账号。',
    reflection: [
      '独立开发让我能更早识别技术边界，也更清楚哪些功能应该留在 MVP 之后。',
      '下一步需要补充测试账号、生成质量评测集和真实用户留存数据。',
    ],
    evidence: [
      { status: 'verified', text: '公开站点可访问，登录页完成桌面端与移动端检查' },
      { status: 'recorded', text: '项目记录：3 周完成用户、任务生成与统计模块' },
      { status: 'pending', text: '待补充：测试账号、GitHub、真实用户与学习效果数据' },
    ],
    flow: ['目标与水平', '任务约束', 'AI 生成', '每日执行', '数据记录', '路径调整'],
    externalLink: { href: 'https://english-study-hub-vercel.vercel.app/login', label: '打开在线产品' },
    visuals: [
      { src: assetPath('projects/ai-english/login-desktop.webp'), alt: 'AI 英语学习平台桌面端登录页', caption: '公开部署的桌面端登录页。' },
      { src: assetPath('projects/ai-english/login-mobile.webp'), alt: 'AI 英语学习平台移动端登录页', caption: '同一页面在 390 像素宽度下的移动端表现。', portrait: true },
    ],
  },
  {
    slug: 'changan',
    title: '“长安的荔枝”主题团建产品',
    subtitle: '把文化 IP 转化为可执行、可计分、可复盘的线下体验',
    kind: '用户研究与线下产品机制',
    role: '产品研发经理助理',
    time: '2025.06 - 2025.10',
    company: '陀螺国际旅行社（天津）有限公司',
    tags: ['用户研究', '机制设计', '线下落地', '跨团队推进'],
    lead: '围绕年轻员工的团建偏好，以文化 IP、角色任务和资源管理机制，设计一场从岭南运送荔枝到长安的沉浸式协作体验。',
    background: '传统团建常见参与意愿低、社交压力强和体验同质化。项目用共同文化 IP 降低破冰成本，再用任务、资源和随机事件制造真实协作。',
    problem: [
      '如何识别年轻员工对团建形式的真实偏好。',
      '如何把文化 IP 转化为可执行、可计分的线下体验。',
      '如何让团队在时间、资源与路线选择中形成协作。',
      '如何协调设计、运营和线下执行完成连续迭代。',
    ],
    responsibilities: [
      '参与用户调研、画像提炼与体验方向定义。',
      '设计鲜度、金帛、支线任务、随机事件和多维获胜条件。',
      '协同设计、运营与线下执行团队推进版本调整。',
    ],
    solution: [
      { label: '用 IP 降低进入门槛', text: '以“长安的荔枝”作为共同叙事，让参与者快速理解目标和风险。' },
      { label: '用资源制造协作', text: '鲜度、金帛与支线任务共同约束团队的时间管理和资源分配。' },
      { label: '用站点推进剧情', text: '庖丁解牛、巧手制瓮、竹运亨通和冰河速递构成主要任务站点。' },
      { label: '用随机事件增加决策', text: '路线选择、金帛筹谋与酿酒支线让不同队伍形成差异化策略。' },
    ],
    outputs: ['用户调研与画像记录', '角色、队伍与任务机制', '四个主要站点和随机事件', '线下执行策划案与物料方案'],
    result: '策划案完整呈现了任务、资源、站点与执行流程。商业效果数据缺少可公开的统计口径与证明，因此不在网站展示。',
    reflection: [
      '线下产品需要同时设计体验机制和执行容错，规则越复杂，现场说明与物料越要简单。',
      '下一步需要补充调研原表、版本变化记录与客户反馈口径。',
    ],
    evidence: [
      { status: 'verified', text: '公开策划案可验证鲜度、金帛、站点、随机事件与多维获胜条件' },
      { status: 'recorded', text: '简历记录：200+ 调研样本与 3 轮产品迭代' },
      { status: 'pending', text: '待补充：客户反馈与商业效果的公开统计口径' },
    ],
    flow: ['用户调研', '偏好提炼', '机制设计', '线下执行', '反馈收集', '版本迭代'],
    visuals: [
      { src: assetPath('projects/changan/cover.webp'), alt: '长安的荔枝主题团建策划案封面', caption: '原创活动方案封面。' },
      { src: assetPath('projects/changan/roles.webp'), alt: '长安的荔枝主题团建角色分工页面', caption: '角色与团队协作机制。' },
      { src: assetPath('projects/changan/flow.webp'), alt: '长安的荔枝主题团建任务流程页面', caption: '从叙事目标到任务执行的流程设计。' },
      { src: assetPath('projects/changan/mechanics.webp'), alt: '长安的荔枝主题团建资源与任务机制页面', caption: '资源、路线与支线任务的机制设计。' },
    ],
  },
]

export const sideWork = {
  title: '养元青校园整合营销策划',
  subtitle: '从市场、竞品与消费者画像，推导三阶段校园传播策略。',
  description: '公开策划案覆盖防脱洗发市场环境、竞品分析、三类消费者画像，以及“共鸣、认同参与、分享传播”的活动路径。本人具体分工与赛事结果仍待补充，因此暂作为策略能力补充，不作为主案例。',
  tags: ['市场分析', '竞品研究', '消费者画像', '传播策略'],
  visuals: [
    { src: assetPath('projects/yangyuanqing/cover.webp'), alt: '养元青校园整合营销策划案封面' },
    { src: assetPath('projects/yangyuanqing/insight.webp'), alt: '养元青策划案消费者画像页面' },
    { src: assetPath('projects/yangyuanqing/strategy.webp'), alt: '养元青策划案三阶段传播策略页面' },
    { src: assetPath('projects/yangyuanqing/schedule.webp'), alt: '养元青策划案活动排期与预期效果页面' },
  ],
}

export const capabilityGroups = [
  {
    title: '洞察与判断',
    items: ['用户调研与画像', '场景与痛点拆解', '竞品与行业研究', '需求优先级判断'],
    proof: '长安团建调研、养元青消费者洞察、易佳佳一线场景拆解',
  },
  {
    title: '方案与落地',
    items: ['PRD 与 Figma 原型', '流程与状态设计', '0-1 MVP', '跨团队联调与验收'],
    proof: '易佳佳消息中心、AI 英语平台、线下团建执行机制',
  },
  {
    title: '技术与数据',
    items: ['AI Agent 与 Workflow', 'RAG 知识治理', 'API 与 SQL 理解', '指标与评测设计'],
    proof: '多智能体路由、知识清洗、OpenAI API、学习任务指标',
  },
]

export const experiences = [
  {
    time: '2026.06 - 至今',
    company: '杭州易启未来智能科技有限公司',
    role: '产品经理实习生',
    summary: '负责 AI 门店助手、多智能体、RAG 知识治理、消息中心与 C 端体验迭代。公司由网易伏羲项目孵化独立，现为网易投资企业。',
  },
  {
    time: '2026.01 - 2026.03',
    company: '成都超有爱科技有限公司',
    role: '产品经理实习生',
    summary: '负责百词斩英语读书模块的每日任务需求、PRD、原型、研发跟进与 AI 接口集成。',
  },
  {
    time: '2025.06 - 2025.10',
    company: '陀螺国际旅行社（天津）有限公司',
    role: '产品研发经理助理',
    summary: '围绕主题团建产品完成用户研究、机制设计和跨团队落地。',
  },
]
