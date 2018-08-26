# Author:  Hadrizia Santos, hadrizia.santos@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados do TSE de candidatos e de votações por munzona (município e zona).
# Dados de entrada dos candidatos têm caminho ../data/candidatos/consulta_cand_<ano>/merged.csv;
# Dados de entrada das votações por munzona têm caminho ../data/candidatos/consulta_cand_<ano>/merged.csv;
# O ano pertence a [2000, 2016].
# Utiliza também as constantes com os nomes das colunas declarados em /utils/constants.R
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado 
# ../data/preprocessed/candidatos/candidatos_auxiliar_<ano>.csv, que contém 
# os dados dos candidatos e o resultado das votações de um ano, que está entre [2000,2016].


library(tidyverse)
library(data.table)
source(here::here("r_scripts/utils/constants.R"))

# Renomeia as colunas de um dataframe
rename_df <- function(df, col_names) {
  names(df) = col_names
  return(df)
}

# Retorna os dados das votações por munzona (município e zona)..
process_votacoes_munzona_data <- function(df){
  df <- df %>%
    rename_df(col_names_candidatos_munzona) %>%
    group_by(ano_eleicao, 
             num_turno, sigla_uf, nome_municipio, 
             descricao_cargo, numero_cand,
             nome_urna_candidato,
             nome_candidato,
             desc_sit_candidato, desc_sit_cand_tot, 
             sigla_partido) %>%
    summarise(total_votos = sum(total_votos))
  
  return(df)
}

# Retorna os dados dos candidatos.
process_candidatos_data <- function(df) {
  df <- df %>%
    rename_df(col_names_candidatos) %>%
    select(numero_cand, sexo, cor_raca, 
           nome_municipio, sigla_uf, descricao_cargo)
  
  return(df)
}

# Une os dados de candidatos aos de votação, adicionando o sexo e a raça dos candidatos.
join_votacoes_and_candidatos <- function(votacoes_munzona_data, candidatos_data) { 
  votacoes_munzona_data <- data.table(votacoes_munzona_data)
  candidatos_data <- data.table(candidatos_data)
  
  data <- left_join(votacoes_munzona_data, candidatos_data, 
                    by=c("numero_cand", "nome_municipio", 
                         "descricao_cargo", "sigla_uf"))
  data <- data %>% 
    distinct()
  
  return(data)
}

# Recebe o ano e retorna o dataframe com as informações dos candidatos e votações de um ano.
process_candidatos_votacoes  <- function(year = 2016) {
  votacoes_data <- read_csv2(paste0(here::here("data"), "/votacoes/votacao_candidato_munzona_", year, "/merged.csv"),
                                  local=locale(encoding="latin1"), col_names = FALSE) %>%
    process_votacoes_munzona_data()
  
  candidatos_data <- read_csv2(paste0(here::here("data"), "/candidatos/consulta_cand_", year, "/merged.csv"),
                                    local=locale(encoding = "latin1"), col_names = FALSE) %>%
    process_candidatos_data()
  
  votacoes_candidatos_joined <- join_votacoes_and_candidatos(votacoes_data, candidatos_data)
  
  write.csv2(votacoes_candidatos_joined, paste0("data/preprocessed/candidatos/candidatos_auxiliar_", year, ".csv"), row.names = FALSE)
  
  return(votacoes_candidatos_joined)
}

process_candidatos_votacoes(2016)
