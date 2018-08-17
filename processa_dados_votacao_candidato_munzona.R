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

col_names_candidatos <- tolower(c("DATA_GERACAO", "HORA_GERACAO","ANO_ELEICAO", "NUM_TURNO",
               "DESCRICAO_ELEICAO", "SIGLA_UF", "SIGLA_UE", "CODIGO_MUNICIPIO",
               "NOME_MUNICIPIO", "NUMERO_ZONA", "CODIGO_CARGO", "NUMERO_CAND",
               "SQ_CANDIDATO", "NOME_CANDIDATO", "NOME_URNA_CANDIDATO", "DESCRICAO_CARGO",
               "COD_SIT_CAND_SUPERIOR", "DESC_SIT_CAND_SUPERIOR", "CODIGO_SIT_CANDIDATO", "DESC_SIT_CANDIDATO",
               "CODIGO_SIT_CAND_TOT", "DESC_SIT_CAND_TOT", "NUMERO_PARTIDO", "SIGLA_PARTIDO",
               "NOME_PARTIDO", "SEQUENCIAL_LEGENDA", "NOME_COLIGACAO", "COMPOSICAO_LEGENDA",
               "TOTAL_VOTOS", "TRANSITO"))
col_names_partidos <- tolower(c("DATA_GERACAO", "HORA_GERACAO", "ANO_ELEICAO", "NUM_TURNO", "DESCRICAO_ELEICAO",
                                "SIGLA_UF", "SIGLA_UE", "CODIGO_MUNICIPIO", "NOME_MUNICIPIO", "NUMERO_ZONA",
                                "CODIGO_CARGO", "DESCRICAO_CARGO", "TIPO_LEGENDA", "NOME_COLIGACAO",
                                "COMPOSICAO_LEGENDA", "SIGLA_PARTIDO", "NUMERO_PARTIDO", "NOME_PARTIDO",
                                "QTDE_VOTOS_NOMINAIS", "QTDE_VOTOS_LEGENDA", "TRANSITO", "SEQUENCIAL_COLIGACAO"))
col_names_eleitorado <- tolower(c("PERIODO", "UF", "MUNICIPIO", "COD_MUNICIPIO_TSE", "NR_ZONA", "SEXO",
                                  "FAIXA_ETARIA", "GRAU_DE_ESCOLARIDADE", "QTD_ELEITORES_NO_PERFIL"))

names(munzona_candidatos_data) <- col_names_candidatos
names(munzona_partidos_data) <- col_names_partidos
names(perfil_eleitorado_2016) <- col_names_eleitorado

munzona_candidatos_data <- 
  munzona_candidatos_data %>%
  dplyr::select(ano_eleicao, num_turno, sigla_uf, nome_municipio, nome_candidato, nome_urna_candidato, descricao_cargo, numero_cand,
                desc_sit_cand_superior, desc_sit_candidato, desc_sit_cand_tot, sigla_partido, nome_coligacao, composicao_legenda,
                total_votos,transito)
munzona_partidos_data <-
  munzona_partidos_data %>%
  dplyr::select(ano_eleicao, num_turno, sigla_uf, nome_municipio, descricao_cargo, nome_coligacao, composicao_legenda, sigla_partido,
                numero_partido, qtde_votos_nominais, qtde_votos_legenda, transito)
perfil_eleitorado_2016 <-
  perfil_eleitorado_2016 %>%
  dplyr::select(-c(cod_municipio_tse, nr_zona))


