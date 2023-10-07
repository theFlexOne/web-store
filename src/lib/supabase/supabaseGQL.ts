import { Json } from '../../types/database.types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import supabaseGQL from './supabaseClient';

export default async function queryGraphQL(
  query: string,
  variables: Record<string, unknown>
): Promise<PostgrestSingleResponse<Json>> {
  return await supabaseGQL.rpc('graphql', {
    query,
    variables: variables as Json,
  });
}
