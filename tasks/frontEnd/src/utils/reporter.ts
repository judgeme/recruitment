const reporter = (error: unknown) => {
  // can set up thing like sentry here for monitoring
  console.log(error);
};

export default reporter;