import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || "tempurl";
const supabaseKey = process.env.SUPABASE_KEY || "tempkey";
const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { commitment } = body;

    // Input validation
    if (!commitment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('commitments')
      .insert([
        {
          created_at: new Date().toISOString(),
          commitment,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting commitment:', error);
      return NextResponse.json(
        { error: 'Failed to store commitment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve commitments
export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { searchParams } = new URL(request.url);
    const commitment = searchParams.get('commitment');

    let query = supabase.from('commitments').select('*');
    
    // If commitment is provided, filter by it
    if (commitment) {
      query = query.eq('commitment', commitment);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching commitments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch commitments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}