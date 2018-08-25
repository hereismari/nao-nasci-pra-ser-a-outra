# Author:  Hadrizia Santos, hadrizia@gmail.com
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# TODO 
# ------------------------- Saída -------------------------------
# TODO


library(tidyverse)

munzona_candidatos_data <- readr::read_csv2(here::here("data/votacao_candidato_munzona_2016/votacao_candidato_munzona_2016_PB.csv"),
                                 local=readr::locale(encoding="latin1"),
                                 col_names = FALSE)

munzona_partidos_data <- readr::read_csv2(here::here("data/votacao_partido_munzona_2016/votacao_partido_munzona_2016_PB.csv"),
                                            local=readr::locale(encoding="latin1"),
                                            col_names = FALSE)

perfil_eleitorado_2016 <- readr::read_csv2(here::here("data/perfil_eleitorado_2016/perfil_eleitorado_2016.csv"),
                                           local=readr::locale(encoding="latin1"),
                                           col_names = FALSE)

all_munzona_candidatos_data <- readr::read_csv2(here::here("data/votacao_candidato_munzona_2016/merged.csv"),
                                            local=readr::locale(encoding="latin1"),
                                            col_names = FALSE)
all_munzona_partidos_data <- 
  readr::read_csv2(here::here("data/votacao_partido_munzona_2016/merged.csv"),
                                          local=readr::locale(encoding="latin1"),
                                          col_names = FALSE) 

formata_candidatos_munzona <- function(ano = 2016, data) {
  col_names_candidatos <- tolower(c("DATA_GERACAO", "HORA_GERACAO","ANO_ELEICAO", "NUM_TURNO",
                                    "DESCRICAO_ELEICAO", "SIGLA_UF", "SIGLA_UE", "CODIGO_MUNICIPIO",
                                    "NOME_MUNICIPIO", "NUMERO_ZONA", "CODIGO_CARGO", "NUMERO_CAND",
                                    "SQ_CANDIDATO", "NOME_CANDIDATO", "NOME_URNA_CANDIDATO", "DESCRICAO_CARGO",
                                    "COD_SIT_CAND_SUPERIOR", "DESC_SIT_CAND_SUPERIOR", "CODIGO_SIT_CANDIDATO", "DESC_SIT_CANDIDATO",
                                    "CODIGO_SIT_CAND_TOT", "DESC_SIT_CAND_TOT", "NUMERO_PARTIDO", "SIGLA_PARTIDO",
                                    "NOME_PARTIDO", "SEQUENCIAL_LEGENDA", "NOME_COLIGACAO", "COMPOSICAO_LEGENDA",
                                    "TOTAL_VOTOS", "TRANSITO"))
  
  names(data) <- col_names_candidatos
  
  data %>%
    dplyr::group_by(sq_candidato, ano_eleicao, num_turno, sigla_uf, nome_municipio, nome_candidato, nome_urna_candidato, descricao_cargo, numero_cand,
                    desc_sit_cand_superior, desc_sit_candidato, desc_sit_cand_tot, sigla_partido, nome_coligacao, composicao_legenda,
                    transito, numero_cand) %>%
    summarise(total_votos = sum(total_votos)) 
}
formata_partidos_munzona <- function(ano = 2016, data) {
  col_names_partidos <- tolower(c("DATA_GERACAO", "HORA_GERACAO", "ANO_ELEICAO", "NUM_TURNO", "DESCRICAO_ELEICAO",
                                  "SIGLA_UF", "SIGLA_UE", "CODIGO_MUNICIPIO", "NOME_MUNICIPIO", "NUMERO_ZONA",
                                  "CODIGO_CARGO", "DESCRICAO_CARGO", "TIPO_LEGENDA", "NOME_COLIGACAO",
                                  "COMPOSICAO_LEGENDA", "SIGLA_PARTIDO", "NUMERO_PARTIDO", "NOME_PARTIDO",
                                  "QTDE_VOTOS_NOMINAIS", "QTDE_VOTOS_LEGENDA", "TRANSITO", "SEQUENCIAL_COLIGACAO"))
  
  names(data) <- col_names_partidos
  
  data %>%
    dplyr::select(ano_eleicao, num_turno, sigla_uf, nome_municipio, descricao_cargo, nome_coligacao, composicao_legenda, sigla_partido,
                  numero_partido, qtde_votos_nominais, qtde_votos_legenda, transito)
}
formata_eleitorado <- function(ano = 2016, data) {
  col_names_eleitorado <- tolower(c("PERIODO", "UF", "MUNICIPIO", "COD_MUNICIPIO_TSE", "NR_ZONA", "SEXO",
                                    "FAIXA_ETARIA", "GRAU_DE_ESCOLARIDADE", "QTD_ELEITORES_NO_PERFIL"))
  
  names(data) <- col_names_eleitorado
  
  data %>%
    dplyr::select(-c(cod_municipio_tse, nr_zona))
}

all_munzona_candidatos_data <- formata_candidatos_munzona(2016, all_munzona_candidatos_data)
all_munzona_partidos_data <- formata_partidos_munzona(2016, all_munzona_partidos_data)
perfil_eleitorado_2016 <-formata_eleitorado(2016, perfil_eleitorado_2016)


# Importa dados
candidatos_data <- readr::read_csv2("data/consulta_cand_2016/merged.csv",
                                    local=locale(encoding = "latin1"))

names(candidatos_data) = c("data_geracao", "hora_geracao", "ano_eleicao",
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

sexo_raca_df <- candidatos_data %>% dplyr::select(numero_cand, sexo, cor_raca, nome_municipio, sigla_uf, descricao_cargo)

data <- left_join(all_munzona_candidatos_data, sexo_raca_df, by=c("numero_cand", "nome_municipio", "descricao_cargo", "sigla_uf"))

write.csv2(data, "data/candidatos_2016.csv")
write.csv2(all_munzona_candidatos_data, "data/all_munzona_candidatos_2016.csv")
