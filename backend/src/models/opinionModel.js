class opinionModel {
  constructor(opinion) {
    this.title = opinion.title;
    this.rating = opinion.rating;
    this.user_id = opinion.user_id;
    this.product_id = opinion.product_id;
    this.context = opinion.context;
  }
}
export default opinionModel;
