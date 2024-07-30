'use client';

import { useForm, Controller } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { SessionType, useSession } from '@lens-protocol/react-web';
import Select from 'react-select';
import Image from 'next/image';
import Particles from "@/components/magicui/particles";

export default function Component() {
  const { register, handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { data: session, loading: sessionLoading } = useSession();
  const [profileId, setProfileId] = useState('');
  const [handle, setHandle] = useState('');
  const [color, setColor] = useState("#f3bb6c");

  useEffect(() => {
    if (session?.authenticated && session.type === SessionType.WithProfile && !sessionLoading) {
      setProfileId(session.profile.id);
      setHandle(session?.profile?.handle?.suggestedFormatted.localName || '');
    }
  }, [session, sessionLoading]);

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      profileId,
      handle,
      artCategory: data.artCategory.map(option => option.value).join(', '),
    };
    try {
      const response = await fetch('/api/submitProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        reset(); // Clear form fields
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const artCategoryOptions = [
    { value: 'Illustration', label: 'Illustration' },
    { value: 'Digital Painting', label: 'Digital Painting' },
    { value: 'Photography', label: 'Photography' },
    { value: '3D Art', label: '3D Art' },
    { value: 'Mixed Media', label: 'Mixed Media' },
    { value: 'Animation', label: 'Animation' },
    { value: 'AI Art', label: 'AI Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Other', label: 'Other (Please specify)' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#000' : '#000',
      borderColor: state.isFocused ? '#555' : '#444',
      color: '#ffff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#ffff',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#ffff',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ffff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#000' : state.isFocused ? '#333' : '#000',
      color: '#ffff',
    }),
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <section className="relative w-full py-24 bg-primary">
        <div className="absolute inset-0">
          <Image src="/images/door-bg.webp" alt="Background" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center text-white dark:text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Mystic Garden Curated Artists Application
            </h1>
            <div className="mt-6 text-lg space-y-4 md:text-xl lg:text-xl leading-relaxed text-left">
              <p>
                Welcome, noble artist, to the Mystic Garden! 🌿✨ We&apos;re delighted you&apos;re considering joining our enchanted community. 
              </p>
              <p>
                While any artist can cast their creations into our magical auctions, those who complete this application and pass our mystical verification process will earn the esteemed title of &quot;verified&quot; artist.
              </p>
              <p>
                This honor grants you additional visibility and opportunities within our sacred grounds. Please fill out the enchanted form below to apply and let your artistic journey in the Mystic Garden begin!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-lg">
            <Card>
              <CardHeader>
                <CardTitle>Submit for Verification</CardTitle>
                <CardDescription>Fill out the form below with your details and artwork.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" {...register('email')} placeholder="Enter your email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input id="website" {...register('website')} placeholder="Enter your Website/Portfolio" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="artCategory">Art Category</Label>
                    <Controller
                      name="artCategory"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={artCategoryOptions}
                          classNamePrefix="react-select"
                          styles={customStyles}
                        />
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea id="additionalInfo" {...register('additionalInfo')} placeholder="Enter any additional information" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={loading || sessionLoading || !session?.authenticated}>
                    {loading ? <ClipLoader size={20} color={"#FFFFFF"} /> : 'Submit for Verification'}
                  </Button>
                  {(!session?.authenticated && !sessionLoading) && (
                    <p className="mt-4 text-sm text-red-600">
                      You need to be logged in to submit the form.
                    </p>
                  )}
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
