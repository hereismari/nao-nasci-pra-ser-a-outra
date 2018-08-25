# Author:  Hadrizia Santos, hadrizia.santos@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados do TSE de candidatos e de votações por munzona (município e zona).
# Dados de entrada dos candidatos têm caminho ../data/Candidatos/consulta_cand_<ano>/merged.csv;
# Dados de entrada das votações por munzona têm caminho ../data/Candidatos/consulta_cand_<ano>/merged.csv;
# O ano pertence a [2000, 2016].
# Utiliza também as constantes com os nomes das colunas declarados em utils/constants.R
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado 
# ../data/preprocessed/Votacoes_e_Candidatos/votacoes_e_candidatos_<ano>.csv, que contém 
# os dados dos candidatos e o resultado das votações de um ano, que está entre [2000,2016].


library(tidyverse)
library(data.table)
source(here::here("r_scripts/utils/constants.R"))

# Renomeia as colunas de um dataframe
rename_df <- function(df, col_names) {
  names(df) = col_names
  return(df)
}

# Retorna os dados das votações por munzona (município e zona) de um ano.
get_votacoes_munzona_data <- function(year = 2016){
  votacoes_data <- read_csv2(paste0(
    here::here("data"), "/Votacoes/votacao_candidato_munzona_", year, "/merged.csv"),
    local=readr::locale(encoding="latin1"),
    col_names = FALSE)
  
  votacoes_data <- votacoes_data %>%
    rename_df(col_names_candidatos_munzona) %>%
    group_by(sq_candidato, ano_eleicao, 
             num_turno, sigla_uf, nome_municipio, 
             nome_candidato, nome_urna_candidato, 
             descricao_cargo, numero_cand,
             desc_sit_cand_superior, desc_sit_candidato, 
             desc_sit_cand_tot, sigla_partido, nome_coligacao, 
             composicao_legenda, transito, numero_cand) %>%
    summarise(total_votos = sum(total_votos)) 
  
  return(votacoes_data)
}

# Retorna os dados dos candidatos de um ano.
get_candidatos_data <- function(year = 2016) {
  candidatos_data <- read_csv2(paste0(
    here::here("data"), "/Candidatos/consulta_cand_", year, "/merged.csv"),
    local=locale(encoding = "latin1"),
    col_names = FALSE)
  
  candidatos_data <- candidatos_data %>%
    rename_df(col_names_candidatos) %>%
    select(numero_cand, sexo, cor_raca, 
           nome_municipio, sigla_uf, descricao_cargo)
  
  return(candidatos_data)
}

# Une os dados de candidatos aos de votação, adicionando o sexo e a raça dos candidatos.
join_votacoes_and_candidatos <- function(votacoes_munzona_data, candidatos_data) { 
  votacoes_munzona_data <- data.table(votacoes_munzona_data)
  candidatos_data <- data.table(candidatos_data)
  
  data <- left_join(votacoes_munzona_data, candidatos_data, 
                    by=c("numero_cand", "nome_municipio", "descricao_cargo", "sigla_uf"))
  data <- data %>% 
    distinct()
  
  return(data)
}

# Recebe um ano, pre-processa os dados e escreve o resultado em um arquivo .csv localizado em: 'data/preprocessed/Candidatos_e_Votacoes/' 
pre_process_votacoes_candidato <- function(year=2016) {
  votacoes_munzona_data <- get_votacoes_munzona_data(year)
  candidatos_data <- get_candidatos_data(year)
  
  votacoes_candidatos_joined <- 
    join_votacoes_and_candidatos(votacoes_munzona_data, candidatos_data)
  
  write.csv2(votacoes_candidatos_joined, 
             paste0(here::here("data/preprocessed/Candidatos_e_Votacoes/"), 
                    "candidatos_e_votacoes_", year, ".csv"))
  
  return(votacoes_candidatos_joined)
}

votacoes_candidatos_joined <- pre_process_votacoes_candidato(2016)
