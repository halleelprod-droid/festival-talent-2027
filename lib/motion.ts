export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1
    }
  }
};

export const fade = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 1.2
    }
  }
};

export const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};