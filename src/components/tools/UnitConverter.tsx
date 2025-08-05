import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRightLeft } from 'lucide-react';

const conversions = {
  length: {
    name: 'Length',
    units: {
      mm: { name: 'Millimeters', factor: 1 },
      cm: { name: 'Centimeters', factor: 10 },
      m: { name: 'Meters', factor: 1000 },
      km: { name: 'Kilometers', factor: 1000000 },
      in: { name: 'Inches', factor: 25.4 },
      ft: { name: 'Feet', factor: 304.8 },
      yd: { name: 'Yards', factor: 914.4 },
      mi: { name: 'Miles', factor: 1609344 }
    }
  },
  weight: {
    name: 'Weight',
    units: {
      mg: { name: 'Milligrams', factor: 1 },
      g: { name: 'Grams', factor: 1000 },
      kg: { name: 'Kilograms', factor: 1000000 },
      oz: { name: 'Ounces', factor: 28349.5 },
      lb: { name: 'Pounds', factor: 453592 },
      ton: { name: 'Tons', factor: 1000000000 }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      c: { name: 'Celsius', factor: 1 },
      f: { name: 'Fahrenheit', factor: 1 },
      k: { name: 'Kelvin', factor: 1 }
    }
  },
  volume: {
    name: 'Volume',
    units: {
      ml: { name: 'Milliliters', factor: 1 },
      l: { name: 'Liters', factor: 1000 },
      cup: { name: 'Cups', factor: 236.588 },
      pt: { name: 'Pints', factor: 473.176 },
      qt: { name: 'Quarts', factor: 946.353 },
      gal: { name: 'Gallons', factor: 3785.41 },
      floz: { name: 'Fluid Ounces', factor: 29.5735 }
    }
  },
  area: {
    name: 'Area',
    units: {
      sqmm: { name: 'Square Millimeters', factor: 1 },
      sqcm: { name: 'Square Centimeters', factor: 100 },
      sqm: { name: 'Square Meters', factor: 1000000 },
      sqkm: { name: 'Square Kilometers', factor: 1000000000000 },
      sqin: { name: 'Square Inches', factor: 645.16 },
      sqft: { name: 'Square Feet', factor: 92903 },
      sqyd: { name: 'Square Yards', factor: 836127 },
      acre: { name: 'Acres', factor: 4046856422.4 }
    }
  }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const convertValue = (value: string, from: string, to: string, cat: string) => {
    if (!value || isNaN(Number(value))) return '';

    const numValue = Number(value);
    const categoryData = conversions[cat as keyof typeof conversions];

    if (cat === 'temperature') {
      // Special handling for temperature conversions
      let celsius: number;
      
      // Convert to Celsius first
      switch (from) {
        case 'c':
          celsius = numValue;
          break;
        case 'f':
          celsius = (numValue - 32) * 5/9;
          break;
        case 'k':
          celsius = numValue - 273.15;
          break;
        default:
          return '';
      }

      // Convert from Celsius to target unit
      switch (to) {
        case 'c':
          return celsius.toFixed(2);
        case 'f':
          return (celsius * 9/5 + 32).toFixed(2);
        case 'k':
          return (celsius + 273.15).toFixed(2);
        default:
          return '';
      }
    } else {
      // Standard conversion using factors
      const fromFactor = (categoryData.units as any)[from]?.factor || 1;
      const toFactor = (categoryData.units as any)[to]?.factor || 1;
      
      const result = (numValue * fromFactor) / toFactor;
      return result.toString();
    }
  };

  useEffect(() => {
    if (fromValue) {
      const result = convertValue(fromValue, fromUnit, toUnit, category);
      setToValue(result);
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, category]);

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    if (value) {
      const result = convertValue(value, toUnit, fromUnit, category);
      setFromValue(result);
    } else {
      setFromValue('');
    }
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory as keyof typeof conversions].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('');
    setToValue('');
  };

  const currentUnits = conversions[category as keyof typeof conversions].units;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Unit Converter</h1>
        <p className="text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Conversion Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conversions).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Convert Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  placeholder="Enter value"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapUnits}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  placeholder="Result"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {fromValue && toValue && (
            <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-lg font-semibold">
                  {fromValue} {(currentUnits as any)[fromUnit]?.name} = {toValue} {(currentUnits as any)[toUnit]?.name}
                </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(conversions).map(([key, conversion]) => (
              <div key={key} className="space-y-2">
                <div className="font-medium">{conversion.name}</div>
                <div className="text-sm text-muted-foreground">
                  {Object.values(conversion.units).map(unit => unit.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverter;