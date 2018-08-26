# Author:  Hadrizia Santos, hadrizia.santos@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados do TSE de candidatos.
# Dados de entrada dos candidatos têm caminho ../data/candidatos/<ano>/consulta_cand_<ano>_*.csv;
# O ano pertence a [2000, 2016].
# Utiliza também as constantes com os nomes das colunas declarados em /utils/constants.R
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado 
# ../data/preprocessed/candidatos/<ano>/candidatos_<ano>.csv, que contém 
# os dados dos candidatos de um ano, que está entre [2000,2016].

library(functional)
library(plyr)
library(tidyverse)
source(here::here("r_scripts/utils/constants.R"))
source(here::here("r_scripts/utils/filters.R"))

# Filtra os candidatos cuja situação é igual a 2º turno (já que está as info sobre o candidato estão
# disponíveis em outra linha com o resultado final do segundo turno) e seleciona apenas variáveis úteis.
preprocess_candidatos <- function(df) {
  df %>%
    filter_not_segundo_turno() %>% 
    select(ano_eleicao, sigla_uf, nome_municipio, 
                numero_cand, nome_candidato, 
                nome_urna_candidato,
                sexo,
                descricao_cargo, sigla_partido, 
                desc_sit_cand_tot, desc_sit_candidato) %>%
    distinct() 
}

# Recupera os nomes das colunas correspondentes.
get_candidatos_columns <- function(ano) {
  if (ano <= 2010) {
    column_names <- col_names_candidatos_ate_2010
  } else if (ano == 2012){
    column_names <- col_names_candidatos_2012
  } else if (ano >= 2014){
    column_names <- col_names_candidatos_2014_em_diante
  }
}

# Retorna um dataframe único para os resultados dos candidatos em um ano.
get_candidatos_por_ano <- function(ano = 2012) {
  # Nome de todos os arquivos necessários
  filenames <- list.files(paste0(here::here("data/candidatos/"), ano), pattern="consulta_cand_*", full.names=TRUE)
  
  # Lendo todos os arquivos e sumarizando em um único arquivo
  read_latin <- Curry(read_delim, delim = ";", col_names=FALSE, local = locale("br", encoding = "latin1"))
  ldf <- lapply(filenames, read_latin)
  df <- ldply(ldf, data.frame)
  
  # Renomeia as colunas do dataframe
  names(df) <- get_candidatos_columns(ano)
  
  return(df)
}

# Preprocessa e salva o dataframe recuperado na função get_votacao_candidato_por_ano().
preprocess_candidatos_por_ano <- function (ano = 2012) {
  df <- get_candidatos_por_ano(ano)
  df <- preprocess_candidatos(df)
  
  # Salva o arquivo no diretório '../data/candidatos/<ano>/candidatos_<ano>.csv'
  #write_csv(df, paste0(here::here("data/candidatos/"), ano, "/candidatos_", ano, ".csv"), row.names = FALSE)
  
  return(df)
} 

# Preprocessa e salva o dataframe recuperado na função get_votacao_candidato_por_ano() para os anos de um intervalo.
preprocess_candidatos_total <- function(ano_inicial, ano_final) {
  df <- lapply(seq(ano_inicial, ano_final, by=2), preprocess_candidatos_por_ano)
  df_f <- do.call(rbind, df)
  
  # Salva o arquivo no diretório '../data/candidatos/candidatos_<ano_inicial>_a_<ano_final>.csv'
  write_csv(df, paste0(here::here("data/candidatos/"), ano, "candidatos_", ano_inicial, "_a_", ano_final, ".csv"), row.names = FALSE)
  
  return(df)
}

#df_2000 <- preprocess_candidatos_por_ano(2000)
#df_2002 <- preprocess_candidatos_por_ano(2002)
#df_2004 <- preprocess_candidatos_por_ano(2004)
#df_2006 <- preprocess_candidatos_por_ano(2006)
#df_2008 <- preprocess_candidatos_por_ano(2008)
#df_2010 <- preprocess_candidatos_por_ano(2010)
#df_2012 <- preprocess_candidatos_por_ano(2012)
#df_2014 <- preprocess_candidatos_por_ano(2014)
#df_2016 <- preprocess_candidatos_por_ano(2016)

#df <- rbind(df_2000, df_2002)
#df <- rbind(df, df_2004)
#df <- rbind(df, df_2006)
#df <- rbind(df, df_2008)
#df <- rbind(df, df_2010)
#df <- rbind(df, df_2012)
#df <- rbind(df, df_2014)
#df <- rbind(df, df_2016)

#write.csv(df, paste0(here::here("data/candidatos/candidatos_"), "2000_a_2016.csv"), row.names = FALSE)


