# ESTE SCRIPT TEM COMO OBJETIVO UNIR TODAS AS TABELAS POR ANO

library(functional)
library(plyr)
library(tidyverse)
source(here::here("r_scripts/utils/filters.R"))
source(here::here("r_scripts/utils/constants.R"))

# Caminho para repositório
#setwd('~/nao2/')

del_cols <- function(df) {
  df %>% select(-c(data_geracao, hora_geracao, sigla_ue, 
                   sq_candidato, cod_sit_cand_superior, 
                   cod_sit_cand_superior, sequencial_legenda, 
                   composicao_legenda, nome_coligacao,
                   nome_partido, codigo_municipio))
}

summarise_votos <- function(df) {
  df %>% 
    filter_not_segundo_turno() %>%
    dplyr::group_by(ano_eleicao, sigla_uf, nome_municipio, 
                  numero_cand, nome_candidato, 
                  nome_urna_candidato,
                  descricao_cargo, sigla_partido,
                  desc_sit_cand_tot) %>%
    dplyr::summarize(total_votos = sum(tot_votos))
}

preprocess_resultados <- function(df) {
  df %>% 
    del_cols %>%
    summarise_votos
}

# Recupera os nomes das colunas correspondentes ao ano 
get_resultado_columns <- function(ano) {
  if (ano <= 2012) {
    column_names <- col_names_candidatos_munzona_ate_2012
  } else {
    column_names <- col_names_candidatos_munzona_2014_em_diante
  }
}

# Retorna um dataframe único para os resultados das votações em um ano
get_resultados_por_ano <- function(ano = 2012) {
  # Nome de todos os arquivos necessários
  filenames <- list.files(paste0("data/candidatos/", ano), pattern="votacao_candidato_munzona_*", full.names=TRUE)
  
  # Lendo todos os arquivos e sumarizando em um único arquivo
  read_latin <- Curry(read_delim, delim = ";", col_names=FALSE, local = locale("br", encoding = "latin1"))
  ldf <- lapply(filenames, read_latin)
  df <- ldply(ldf, data.frame)
  
  # Renomeia as colunas do dataframe
  names(df) <- get_resultado_columns(ano)
  
  return(df)
}

# Preprocessa e salva o dataframe recuperado na função get_resultados_por_ano()
preprocess_resultados_por_ano <- function (ano = 2012) {
  df <- get_resultados_por_ano(ano)
  df <- preprocess_resultados(df)
  
  # Salva o arquivo no diretório '../data/candidatos/<ano>/resultados_<ano>.csv'
  write_csv(df, paste0(here::here("data/candidatos/"), ano, "/resultados_", ano, ".csv"))
  
  return(df)
} 

preprocess_resultados_total <- function(ano_inicial, ano_final) {
  df <- do.call(rbind, lapply(seq(ano_inicial, ano_final, by=2), preprocess_resultados_por_ano))
  
  #write_csv(df, paste0(here::here("data/candidatos/resultados_total.csv"))
  
  return(df)
}

df <- preprocess_resultados_por_ano(2002)


