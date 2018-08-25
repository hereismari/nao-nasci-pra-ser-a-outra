# ESTE ARQUIVO TEM COMO FINALIDADE GUARDAR AS CONSTANTES UTILIZADAS PELOS SCRIPTS R.

# Nomes das colunas da tabela dos candidatos com munzonas
col_names_candidatos_munzona <- tolower(c("DATA_GERACAO", "HORA_GERACAO","ANO_ELEICAO", "NUM_TURNO",
                                  "DESCRICAO_ELEICAO", "SIGLA_UF", "SIGLA_UE", "CODIGO_MUNICIPIO",
                                  "NOME_MUNICIPIO", "NUMERO_ZONA", "CODIGO_CARGO", "NUMERO_CAND",
                                  "SQ_CANDIDATO", "NOME_CANDIDATO", "NOME_URNA_CANDIDATO", "DESCRICAO_CARGO",
                                  "COD_SIT_CAND_SUPERIOR", "DESC_SIT_CAND_SUPERIOR", "CODIGO_SIT_CANDIDATO", "DESC_SIT_CANDIDATO",
                                  "CODIGO_SIT_CAND_TOT", "DESC_SIT_CAND_TOT", "NUMERO_PARTIDO", "SIGLA_PARTIDO",
                                  "NOME_PARTIDO", "SEQUENCIAL_LEGENDA", "NOME_COLIGACAO", "COMPOSICAO_LEGENDA",
                                  "TOTAL_VOTOS", "TRANSITO"))

# Nomes das colunas da tabela dos candidatos 
col_names_candidatos <- c("data_geracao", "hora_geracao", "ano_eleicao",
                          "num_turno", "descricao_eleicao", "sigla_uf",
                          "cod_cidade", "nome_municipio", "cod_cargo", "descricao_cargo", 
                          "nome_candidato",
                          "sequencial_candidato", "numero_cand","cpf_candidato",
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

