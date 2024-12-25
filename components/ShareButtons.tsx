import { Twitter, Facebook, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => window.open(shareUrls.twitter, '_blank')}>
        <Twitter className="w-4 h-4 mr-2" />
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={() => window.open(shareUrls.facebook, '_blank')}>
        <Facebook className="w-4 h-4 mr-2" />
        Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={() => window.open(shareUrls.linkedin, '_blank')}>
        <Linkedin className="w-4 h-4 mr-2" />
        LinkedIn
      </Button>
    </div>
  )
}

