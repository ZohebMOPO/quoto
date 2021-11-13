import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  quote: Scalars['String'];
  register: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationQuoteArgs = {
  quote: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type AyyoQueryVariables = Exact<{ [key: string]: never; }>;


export type AyyoQuery = { __typename?: 'Query', hello: string };


export const AyyoDocument = gql`
    query ayyo {
  hello
}
    `;

/**
 * __useAyyoQuery__
 *
 * To run a query within a React component, call `useAyyoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAyyoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAyyoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAyyoQuery(baseOptions?: Apollo.QueryHookOptions<AyyoQuery, AyyoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AyyoQuery, AyyoQueryVariables>(AyyoDocument, options);
      }
export function useAyyoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AyyoQuery, AyyoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AyyoQuery, AyyoQueryVariables>(AyyoDocument, options);
        }
export type AyyoQueryHookResult = ReturnType<typeof useAyyoQuery>;
export type AyyoLazyQueryHookResult = ReturnType<typeof useAyyoLazyQuery>;
export type AyyoQueryResult = Apollo.QueryResult<AyyoQuery, AyyoQueryVariables>;