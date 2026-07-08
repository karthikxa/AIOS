"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Boxes, Monitor } from "lucide-react";

const features = [
  {
    title: "Swarm Agents",
    description: "Deploy multiple specialized agents working in sync to coordinate complex tasks.",
    icon: Boxes,
    action: () => {},
  },
  {
    title: "Get work done with Computer",
    description: "Hand off your projects to get polished, reliable deliverables around the clock.",
    icon: Monitor,
    badge: "NEW",
    action: () => {},
  },
];

export function FeatureCards() {
  return (
    <div className="flex gap-4 w-full max-w-2xl mx-auto px-4">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="flex-1 cursor-pointer transition-colors hover:bg-muted/50"
          onClick={feature.action}
        >
          <CardContent className="flex items-start gap-3 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <feature.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{feature.title}</h3>
                {feature.badge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
