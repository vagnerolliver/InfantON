// Esse átomo é usado em Aluno e Funcionario:
module.exports = {
  type: String
, validate: require('./../hadrons/typeValidateMongoose')
, required: true
}