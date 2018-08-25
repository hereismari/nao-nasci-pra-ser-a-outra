library(tidyverse)
library(data.table)
source(here::here("r_scripts/utils/constants.R"))

# Renomeia as colunas de um dataframe
rename_df <- function(df, col_names) {
  names(df) = col_names
  df
}

#' @title Processa dados das votações por munzonas (municípios e zona) em determinado ano.
#' @description Dado um ano, importa os dados das votações deste ano e retorna um dataframe.
#' @param year - Ano dos dados das votações por munzonas (municípios e zona)
get_votacoes_munzona_data <- function(year = 2016){
  votacoes_data <- read_csv2(paste0(
    here::here("data"), "/Votacoes/votacao_candidato_munzona_", year, "/merged.csv"),
    local=readr::locale(encoding="latin1"),
    col_names = FALSE)
  
  votacoes_data %>%
    rename_df(col_names_candidatos_munzona) %>%
    group_by(sq_candidato, ano_eleicao, 
             num_turno, sigla_uf, nome_municipio, 
             nome_candidato, nome_urna_candidato, 
             descricao_cargo, numero_cand,
             desc_sit_cand_superior, desc_sit_candidato, 
             desc_sit_cand_tot, sigla_partido, nome_coligacao, 
             composicao_legenda, transito, numero_cand) %>%
    summarise(total_votos = sum(total_votos)) 
}

get_candidatos_data <- function(year = 2016) {
  candidatos_data <- read_csv2(paste0(
    here::here("data"), "/Candidatos/consulta_cand_", year, "/merged.csv"),
    local=locale(encoding = "latin1"),
    col_names = FALSE)
  
  candidatos_data %>%
    rename_df(col_names_candidatos) %>%
    select(numero_cand, sexo, cor_raca, nome_municipio, sigla_uf, descricao_cargo)
}

join_votacoes_and_candidatos <- function(votacoes_munzona_data, candidatos_data) { 
  votacoes_munzona_data <- data.table(votacoes_munzona_data)
  candidatos_data <- data.table(candidatos_data)
  
  data <- left_join(votacoes_munzona_data, candidatos_data, 
                    by=c("numero_cand", "nome_municipio", "descricao_cargo", "sigla_uf"))
}

process_votacoes_candidato <- function(year=2016) {
  votacoes_munzona_data <- get_votacoes_munzona_data(year)
  candidatos_data <- get_candidatos_data(year)
  
  votacoes_candidatos_joined <- join_votacoes_and_candidatos(votacoes_munzona_data, candidatos_data)
  
  write.csv2(votacoes_candidatos_joined, 
             paste0(here::here("data/preprocessed/Candidatos_e_Votacoes/"), 
                    "candidatos_e_votacoes_", year, ".csv"))
  
  return(votacoes_candidatos_joined)
}

votacoes_candidatos_joined <- process_votacoes_candidato(2016)
