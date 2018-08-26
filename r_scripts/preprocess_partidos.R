# Author:  Hadrizia Santos, hadrizia.santos@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados preprocessados do script processa-candidato.R que estão no caminho
# ../data/preprocessed/candidatos/candidatos_auxiliar_<ano>.csv, onde o ano pertence a [2000, 2016].
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado 
# ../data/preprocessed/partidos.csv, que contém 
# os dados dos candidatos, como número de candidatas fantasmas, número de mulheres com pelo menos um voto, numero total de candidatos,
# proporção de mulheres no partido, etc.


library(tidyverse)
library(data.table)
source(here::here("r_scripts/utils/filters.R"))

# Retorna as candidatas do sexo feminino com zero votos e sumariza o total dessas candidatas por partido, uf e ano de eleição.
get_fem_ghost_candidates <- function(df) {
  df <- df %>% 
    filter_get_candidates_fem() %>%
    filter_ghost_candidates() %>%
    group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
    summarise(cont_candidatas_zero_voto = n())
  
  df <- data.table(df)
  return(df)
}

# Retorna as candidatas do sexo feminino com algum voto e sumariza o total dessas candidatas por partido, uf e ano de eleição.
get_fem_not_ghost_candidates <- function(df) {
  df <- df %>% 
    filter_get_candidates_fem() %>%
    filter_not_ghost_candidates() %>%
    group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
    summarise(cont_candidatas_algum_voto = n())
  
  df <- data.table(df)
  return(df)
}

# Retorna os candidatos do sexo masculino e sumariza o total desses candidatos por partido, uf e ano de eleição.
get_masc_candidates <- function(df){
  df <- df %>%
    filter_get_candidates_masc() %>%
    group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
    summarise(total_candidatos = n())
  
  df <- data.table(df)
  return(df)
}

# Une dois dataframes por partido, estado e ano de eleição.
merge_data <- function(df1, df2) {
  df <- merge(df1, df2, by=c("ano_eleicao", "sigla_partido", "sigla_uf"))
  
  return(df)
}

# Reúne os dados de candidatas fantasmas, não fantasmas e candidatos do sexo masculino.
merge_candidates_data <- function(df) {
  merged_candidates_data <- 
    merge_data(get_fem_ghost_candidates(df), 
                          get_fem_not_ghost_candidates(df)) %>%
    merge_data(get_masc_candidates(df))
  
  return(merged_candidates_data)
}

# Filtra os candidatos não desistentes, reúne os dados resultantes da função merge_candidates_data(df) e 
# adiciona as colunas com o total de todos os candidatos (feminino e masculino), total de candidatas mulheres e 
# a proporcao de mulheres (por partido, estado e ano de eleição).
preprocess <- function(df) {
  df <- df %>% filter_desistentes()
  
  preprocessed_data <- merge_candidates_data(df) %>%
    mutate(
      total_candidatas = cont_candidatas_zero_voto + cont_candidatas_algum_voto,
      total_candidatos = total_candidatos + total_candidatas,
      proporcao_mulheres = round(total_candidatas * 100 / total_candidatos, 3)) 
  
  return(preprocessed_data)
}

#data <- readr::read_csv2(here::here("data/preprocessed/candidatos.csv"),
#                         local=readr::locale("br"))

# Processando os dados de 2016
data <- read_csv2(here::here("data/preprocessed/candidatos_e_votacoes/candidatos_e_votacoes_2016.csv"))

summarized_data <- preprocess(data)

write.csv2(summarized_data, here::here("data/preprocessed/partidos.csv"), row.names = FALSE)
