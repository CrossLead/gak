export default class Graph {

  constructor(data) {

    if (data instanceof Graph) {
      this.data = data.data;
    } else {
      this.load(data);
    }

  }

  load(data, type) {

  }

  communities(type) {

  }

  rank(type) {

  }

}
