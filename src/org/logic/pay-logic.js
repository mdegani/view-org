const chiefSalary = 750000;
const jobs = [
  {
    id: 1,
    title: "CEO",
    rel: null,
    ratio: 1
  },
  {
    id: 2,
    title: "EVP",
    rel: 1,
    ratio: 0.75
  },
  {
    id: 3,
    title: "VP",
    rel: 2,
    ratio: 0.75
  },
  {
    id: 4,
    title: "Director",
    rel: 3,
    ratio: 0.75
  },
  {
    id: 5,
    title: "Manager 2 (Prof)",
    rel: 4,
    ratio: 0.6
  },
  {
    id: 6,
    title: "P4",
    rel: 5,
    ratio: 0.6
  },
  {
    id: 7,
    title: "P3",
    rel: 6,
    ratio: 0.8
  },
  {
    id: 8,
    title: "P2",
    rel: 7,
    ratio: 0.8
  },
  {
    id: 9,
    title: "P1",
    rel: 8,
    ratio: 0.8
  },
  {
    id: 10,
    title: "Manager 1 (Admin)",
    rel: 4,
    ratio: 0.6
  },
  {
    id: 11,
    title: "A4 (TL)",
    rel: 10,
    ratio: 0.6
  },
  {
    id: 12,
    title: "A3",
    rel: 11,
    ratio: 0.7
  },
  {
    id: 13,
    title: "A2",
    rel: 12,
    ratio: 0.8
  },
  {
    id: 14,
    title: "A1",
    rel: 13,
    ratio: 8
  }
];

const getMultipliedSal = (jobs, mainJob, ratio, chiefSalary) => {
  if (!mainJob.rel) {
    return 750000;
  }
  const relJob = jobs.find(sJob => sJob.id === mainJob.rel);
  if (!relJob.rel) {
    return 750000 * relJob.ratio * ratio;
  }
  return getMultipliedSal(jobs, relJob, ratio * relJob.ratio);
};

const comp = jobs.map((job, jobIdx, allJobs, chiefSalary) => {
  return {
    id: job.id,
    title: job.title,
    levelMid: getMultipliedSal(allJobs, job, job.ratio)
  };
});
