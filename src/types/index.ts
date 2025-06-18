export interface Coin {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap:                       number;
    market_cap_rank:                  number;
    fully_diluted_valuation:          number;
    total_volume:                     number;
    high_24h:                         number;
    low_24h:                          number;
    price_change_24h:                 number;
    price_change_percentage_24h:      number;
    market_cap_change_24h:            number;
    market_cap_change_percentage_24h: number;
    circulating_supply:               number;
    total_supply:                     number;
    max_supply:                       number;
    ath:                              number;
    ath_change_percentage:            number;
    ath_date:                         Date;
    atl:                              number;
    atl_change_percentage:            number;
    atl_date:                         Date;
    roi:                              null;
    last_updated:                     Date;
}

export interface CoinState {
    coins: Coin[],
    loading: 'pending' | 'success' | 'failure',
    error: string | null,
}

export interface IDropDown {
  selectedToken: Coin | null,
  coins: Coin[],
  onSelect: (coin: Coin) => void;
}

export interface IUserTokenList {
    address: string,
    chainId: any,
}

export interface IToken {
  selectedToken: string | undefined,
  chartDuration: number,
  onDurationSelect: (duration: number)=>void,
  chain: string,
  tokenAddress: string,
  isCoingecko: boolean
}

export interface PriceState {
  prices: Array<number[]>;
  loading: 'pending' | 'success' | 'failure';
  error: string | null;
}

export interface Token {
    contract_name:          string;
    contract_ticker_symbol: string;
    contract_decimals:      number;
    contract_address:       string;
    coin:                   number;
    balance:                string;
    quote:                  string;
    quote_rate:             string;
    logo_url:               string;
    quote_rate_24h:         string;
    quote_pct_change_24h:   number;
    quote_price:            string;
}

export interface UserTokenListState {
    userTokens: Token[],
    loading: 'pending' | 'success' | 'failure',
    error: string | null,
}