extract_candidatos <- function(ano){
  # Importa dados
  data_votacoes <- readr::read_csv2(paste0("data/consulta_cand_", ano, "/consulta_cand_", ano, "_PB.csv"),
                                    local=locale(encoding = "latin1"))
  
  names(data_votacoes) = c("data_geracao", "hora_geracao", "ano_eleicao",
                                              "num_turno", "descricao_eleicao", "sigla_uf",
                                              "cod_cidade", "nome_municipio", "cod_cargo", "descricao_cargo", 
                                              "nome_candidato",
                                              "sequencial_candidato", "numero_candidato","cpf_candidato",
                                              "nome_urna_candidato","cod_situacao_candidatura", 
                                              "desc_sit_cand_superior", "numero_partido", "sigla_partido",
                                              "nome_partido", "codigo_legenda","sigla_legenda", 
                                              "composicao_legenda", "nome_coligacao", "codigo_ocupacao",
                                              "descricao_ocupacao", "data_nascimento", 
                                              "num_tit_eleitoral_candidato",
                                              "idade_data_candidato", "cod_sexo", "sexo", 
                                              "cod_grau_instrucao",
                                              "grau_instrucao", "cod_estado_civil", "estado_civil",
                                              "cod_cor_raca", "cor_raca", "codigo_nacionalidade",
                                              "descricao_nacionalidade", "sigla_UF_nascimento",
                                              "cod_municipio_nascimento", "nome_municipio_nascimento",
                                              "despesa_max_campanha", "cod_sit_tot_turno",
                                              "desc_sit_cand_tot", "email")
  data_votacoes %>% 
    select(numero_candidato, nome_candidato, sexo, cor_raca, descricao_cargo, ano_eleicao, nome_municipio, sigla_uf, sigla_partido, 
           nome_partido, nome_coligacao, composicao_legenda, desc_sit_cand_tot)
}

