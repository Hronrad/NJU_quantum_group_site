/**
 * 南京大学量子信息组网站内容数据
 *
 * 维护论文或成员时只需编辑本文件。字段说明见 assets/data/README.md。
 */
window.QIG_DATA = Object.freeze({
  publications: [
    {
      id: "xun-2024-sparse-coding",
      year: 2024,
      date: "2024-09-02",
      dateLabel: "02 SEP 2024",
      title: "Quantum sparse coding and decoding based on quantum network",
      authors: ["Ji Xun", "Qin Liu", "Shan Huang", "Andi Chen", "Shengjun Wu"],
      venue: "Applied Physics Letters 125, 104002",
      journal: "Applied Physics Letters",
      url: "https://pubs.aip.org/aip/apl/article/125/10/104002/3311520",
      featured: true
    },
    {
      id: "huang-2024-complementarity",
      year: 2024,
      date: "2024-02-26",
      dateLabel: "26 FEB 2024",
      title: "Quantum complementarity from a measurement-based perspective",
      authors: ["Shan Huang", "Wen-Bo Liu", "Yundu Zhao", "Hua-Lei Yin", "Zeng-Bing Chen", "Shengjun Wu"],
      venue: "Physical Review A 109, 022235",
      journal: "Physical Review A",
      url: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.109.022235",
      featured: true
    },
    {
      id: "xun-2024-image-compression",
      year: 2024,
      date: "2024-05-27",
      dateLabel: "27–31 MAY 2024",
      title: "Image Compression and Reconstruction Based on Quantum Network",
      authors: ["Ji Xun", "Qin Liu", "Shan Huang", "Andi Chen", "Shengjun Wu"],
      venue: "2024 IEEE IPDPS Workshops, pp. 1128–1135",
      journal: "IEEE IPDPS Workshops",
      url: "https://ieeexplore.ieee.org/abstract/document/10596496",
      featured: false
    },
    {
      id: "huang-2024-uncertainty",
      year: 2024,
      date: "2024-01-31",
      dateLabel: "31 JAN 2024",
      title: "Entropic uncertainty relations for multiple measurements assigned with biased weights",
      authors: ["Shan Huang", "Hua-Lei Yin", "Zeng-Bing Chen", "Shengjun Wu"],
      venue: "Physical Review Research 6, 013127",
      journal: "Physical Review Research",
      url: "https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.6.013127",
      featured: true
    },
    {
      id: "zhao-2024-quantum-designs",
      year: 2024,
      date: "2024-09-12",
      dateLabel: "12 SEP 2024",
      title: "Entropic uncertainty relations and entanglement detection from quantum designs",
      authors: ["Yundu Zhao", "Shan Huang", "Shengjun Wu"],
      venue: "J. Phys. A: Math. Theor. 57, 395305",
      journal: "Journal of Physics A",
      url: "https://iopscience.iop.org/article/10.1088/1751-8121/ad74bb/meta",
      featured: false
    },
    {
      id: "zhao-2023-associations",
      year: 2023,
      date: "2023-08-10",
      dateLabel: "10 AUG 2023",
      title: "Quantifying direct associations between variables",
      authors: ["Minyuan Zhao", "Yun Chen", "Qin Liu", "Shengjun Wu"],
      venue: "Fundamental Research",
      journal: "Fundamental Research",
      url: "https://www.sciencedirect.com/science/article/pii/S2667325823002212",
      featured: false
    },
    {
      id: "huang-2023-primitive-polynomials",
      year: 2023,
      date: "2023-11-03",
      dateLabel: "03 NOV 2023",
      title: "Quantum-Accelerated Algorithms for Generating Random Primitive Polynomials Over Finite Fields",
      authors: ["Shan Huang", "Hua-Lei Yin", "Zeng-Bing Chen", "Shengjun Wu"],
      venue: "Advanced Quantum Technologies 2300302",
      journal: "Advanced Quantum Technologies",
      url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/qute.202300302",
      featured: false
    },
    {
      id: "lin-2023-quantum-walks",
      year: 2023,
      date: "2023-04-05",
      dateLabel: "05 APR 2023",
      title: "Implementing arbitrary quantum operations via quantum walks on a cycle graph",
      authors: ["Jia-Yi Lin", "Xin-Yu Li", "Yu-Hao Shao", "Wei Wang", "Shengjun Wu"],
      venue: "Physical Review A 107, 042405",
      journal: "Physical Review A",
      url: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.107.042405",
      featured: false
    },
    {
      id: "wang-2022-stochastic-walks",
      year: 2022,
      date: "2022-04-20",
      dateLabel: "20 APR 2022",
      title: "Implementation of quantum stochastic walks for function approximation, two-dimensional data classification, and sequence classification",
      authors: ["Lu-Ji Wang", "Jia-Yi Lin", "Shengjun Wu"],
      venue: "Physical Review Research 4, 023058",
      journal: "Physical Review Research",
      url: "https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.4.023058",
      featured: false
    }
  ],

  memberGroups: [
    { id: "faculty", label: "教师与研究人员", labelEn: "Faculty and researchers", role: "FACULTY", emptyText: "成员资料待课题组确认后发布。", emptyTextEn: "Member profiles will be published after group confirmation." },
    { id: "doctoral", label: "博士研究生", labelEn: "Doctoral students", role: "DOCTORAL", emptyText: "成员资料待课题组确认后发布。", emptyTextEn: "Member profiles will be published after group confirmation." },
    { id: "master", label: "硕士研究生", labelEn: "Master's students", role: "MASTER", emptyText: "成员资料待课题组确认后发布。", emptyTextEn: "Member profiles will be published after group confirmation." },
    { id: "alumni", label: "毕业成员", labelEn: "Alumni", role: "ALUMNI", emptyText: "毕业成员与去向信息待课题组确认后发布。", emptyTextEn: "Alumni profiles and current positions will be published after confirmation." }
  ],

  // 姓名未获确认前保持空数组；请勿根据论文作者名单推断在组成员。
  members: []
});
